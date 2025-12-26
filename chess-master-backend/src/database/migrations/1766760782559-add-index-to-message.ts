import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToMessage1766760782559 implements MigrationInterface {
    name = 'AddIndexToMessage1766760782559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c59262513a3006fd8f58bb4b7c" ON "message" ("fromUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96789153e31e0bb7885ea13a27" ON "message" ("toUserId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_96789153e31e0bb7885ea13a27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c59262513a3006fd8f58bb4b7c"`);
    }

}
