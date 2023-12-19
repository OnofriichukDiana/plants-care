import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702992329913 implements MigrationInterface {
    name = 'Migrations1702992329913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_like" ("id" SERIAL NOT NULL, "commentId" integer NOT NULL, "authId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD "countLikes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_ddb9abdd2a41f4189c5e3ca4c2c" FOREIGN KEY ("authId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_a253dba95eab8659c027bbace44" FOREIGN KEY ("commentId") REFERENCES "post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_a253dba95eab8659c027bbace44"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_ddb9abdd2a41f4189c5e3ca4c2c"`);
        await queryRunner.query(`ALTER TABLE "post_comment" DROP COLUMN "countLikes"`);
        await queryRunner.query(`DROP TABLE "comment_like"`);
    }

}
