import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminDataToUsers1765746638004 implements MigrationInterface {
    name = 'AddAdminDataToUsers1765746638004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "status" text NOT NULL DEFAULT 'active', "password" bytea NOT NULL, "salt" bytea NOT NULL, CONSTRAINT "UQ_2873882c38e8c07d98cb64f962d" UNIQUE ("username"), CONSTRAINT "UQ_dcd0c8a4b10af9c986e510b9ecc" UNIQUE ("email"), CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_users"`);
    }

}
