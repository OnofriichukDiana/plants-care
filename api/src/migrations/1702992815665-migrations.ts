import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702992815665 implements MigrationInterface {
    name = 'Migrations1702992815665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comment" DROP CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710"`);
        await queryRunner.query(`ALTER TABLE "post_comment" ALTER COLUMN "parentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710" FOREIGN KEY ("parentId") REFERENCES "post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comment" DROP CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710"`);
        await queryRunner.query(`ALTER TABLE "post_comment" ALTER COLUMN "parentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710" FOREIGN KEY ("parentId") REFERENCES "post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
