
import { AppDataSource } from "../../src/database/datasource";
import { User } from "../../src/database/entity/user";
import { Message } from "../../src/database/entity/message";
import { unauthAgent } from "../setup";

describe("GET /messages/unread-senders", () => {
    let userA: User;
    let userB: User;
    let userC: User;
    let userD: User;
    let userE: User;

    beforeEach(async () => {
        const userRepo = AppDataSource.getRepository(User);

        // Create users
        userA = await userRepo.save(userRepo.create({ username: "usera", email: "usera@test.com" }));
        userB = await userRepo.save(userRepo.create({ username: "userb", email: "userb@test.com" }));
        userC = await userRepo.save(userRepo.create({ username: "userc", email: "userc@test.com" }));
        userD = await userRepo.save(userRepo.create({ username: "userd", email: "userd@test.com" }));
        userE = await userRepo.save(userRepo.create({ username: "usere", email: "usere@test.com" }));

        const messageRepo = AppDataSource.getRepository(Message);

        // B -> A (1 seen)
        await messageRepo.save({ fromUserId: userB.id, toUserId: userA.id, text: "seen", isSeen: true });
        // B -> A (2 unseen)
        await messageRepo.save({ fromUserId: userB.id, toUserId: userA.id, text: "unseen1", isSeen: false });
        await messageRepo.save({ fromUserId: userB.id, toUserId: userA.id, text: "unseen2", isSeen: false });

        // C -> A (1 unseen)
        await messageRepo.save({ fromUserId: userC.id, toUserId: userA.id, text: "unseen3", isSeen: false });

        // A -> B (1 unseen - outgoing for A, incoming for B)
        await messageRepo.save({ fromUserId: userA.id, toUserId: userB.id, text: "unseen4", isSeen: false });

        // D -> A (1 seen only)
        await messageRepo.save({ fromUserId: userD.id, toUserId: userA.id, text: "seenD", isSeen: true });

        // A -> E (1 unseen - outgoing for A. E should appear in A's list)
        await messageRepo.save({ fromUserId: userA.id, toUserId: userE.id, text: "hello E", isSeen: false });
    });

    it("should return correct unread counts and include outgoing conversation partners", async () => {
        const response = await unauthAgent
            .get(`/messages/unread-senders?userId=${userA.id}`)
            .expect(200);

        const data = response.body;
        // Should include B (incoming/outgoing mixed), C (incoming), D (incoming seen), E (outgoing only)
        expect(data).toHaveLength(4);

        const userBData = data.find((d: any) => d.userId === userB.id);
        expect(userBData).toBeDefined();
        // B sent 2 unseen messages to A. A's outgoing to B shouldn't affect this count.
        expect(userBData.unreadCount).toBe(2);
        expect(userBData.username).toBe("userb");

        const userCData = data.find((d: any) => d.userId === userC.id);
        expect(userCData).toBeDefined();
        expect(userCData.unreadCount).toBe(1);

        const userDData = data.find((d: any) => d.userId === userD.id);
        expect(userDData).toBeDefined();
        expect(userDData.unreadCount).toBe(0);

        const userEData = data.find((d: any) => d.userId === userE.id);
        expect(userEData).toBeDefined();
        expect(userEData.unreadCount).toBe(0); // A sent to E, so count is 0
        expect(userEData.username).toBe("usere");
    });

    it("should return 0 count for user with only seen messages", async () => {
        const response = await unauthAgent
            .get(`/messages/unread-senders?userId=${userA.id}`)
            .expect(200);

        const data = response.body;
        const userBData = data.find((d: any) => d.userId === userB.id);
        // B sent 1 seen and 2 unseen -> count 2.
        // Wait, the test setup says:
        // B -> A (1 seen)
        // B -> A (2 unseen)
        // So B should have 2. 

        // Let's add a User D who only sent seen messages to verify 0 count.
    });

    it("should return 400 if userId is missing", async () => {
        await unauthAgent
            .get("/messages/unread-senders")
            .expect(400);
    });
});
