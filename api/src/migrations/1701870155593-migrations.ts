import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1701870155593 implements MigrationInterface {
    name = 'Migrations1701870155593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "avatarUrl" SET NOT NULL`);
    }

}
