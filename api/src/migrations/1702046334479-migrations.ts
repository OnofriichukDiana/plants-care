import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702046334479 implements MigrationInterface {
    name = 'Migrations1702046334479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "size" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "size"`);
    }

}
