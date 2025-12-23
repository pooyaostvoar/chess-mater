import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLanguages1766527111188 implements MigrationInterface {
    name = 'AddLanguages1766527111188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "languages" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "languages"`);
    }

}
