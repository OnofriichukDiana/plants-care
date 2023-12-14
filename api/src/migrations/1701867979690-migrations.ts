import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1701867979690 implements MigrationInterface {
    name = 'Migrations1701867979690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_like" ("id" SERIAL NOT NULL, "postId" integer NOT NULL, "authId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e95caa8a8b56d7797569cf5dc6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_comment" ("id" SERIAL NOT NULL, "message" text, "postId" integer NOT NULL, "authId" integer NOT NULL, "parentId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0d63e41c3c55e11319613550c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "avatarUrl" character varying NOT NULL, "icon" character varying, "avatarBackground" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "message" text, "countLikes" integer NOT NULL DEFAULT '0', "countComments" integer NOT NULL DEFAULT '0', "isShowTags" boolean NOT NULL DEFAULT false, "tags" text array NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_file" ("id" SERIAL NOT NULL, "postId" integer NOT NULL, "mediaId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92d3b60cdcdd57e2ea334c1b26d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "path" text NOT NULL, "name" text NOT NULL, "mime" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_file" ("id" SERIAL NOT NULL, "commentId" integer NOT NULL, "mediaId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82d253ec0eee2847f7aed08cbf4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_like" ADD CONSTRAINT "FK_06b92ea68548aa7e64b094b5d6a" FOREIGN KEY ("authId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_like" ADD CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD CONSTRAINT "FK_1e0a9573fcdc2ca7884e105fe86" FOREIGN KEY ("authId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comment" ADD CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710" FOREIGN KEY ("parentId") REFERENCES "post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_file" ADD CONSTRAINT "FK_a362006e523e746dd906c05ad28" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_file" ADD CONSTRAINT "FK_e64c8840cd4cf48791f0642a8c3" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_file" ADD CONSTRAINT "FK_cc8be13ff4e856f0baa0917c556" FOREIGN KEY ("commentId") REFERENCES "post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_file" ADD CONSTRAINT "FK_dce0313ccea4afac6f290193118" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_file" DROP CONSTRAINT "FK_dce0313ccea4afac6f290193118"`);
        await queryRunner.query(`ALTER TABLE "comment_file" DROP CONSTRAINT "FK_cc8be13ff4e856f0baa0917c556"`);
        await queryRunner.query(`ALTER TABLE "post_file" DROP CONSTRAINT "FK_e64c8840cd4cf48791f0642a8c3"`);
        await queryRunner.query(`ALTER TABLE "post_file" DROP CONSTRAINT "FK_a362006e523e746dd906c05ad28"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "post_comment" DROP CONSTRAINT "FK_8018bc65c89f9b88fdb38d02710"`);
        await queryRunner.query(`ALTER TABLE "post_comment" DROP CONSTRAINT "FK_1e0a9573fcdc2ca7884e105fe86"`);
        await queryRunner.query(`ALTER TABLE "post_comment" DROP CONSTRAINT "FK_c7fb3b0d1192f17f7649062f672"`);
        await queryRunner.query(`ALTER TABLE "post_like" DROP CONSTRAINT "FK_789b3f929eb3d8760419f87c8a9"`);
        await queryRunner.query(`ALTER TABLE "post_like" DROP CONSTRAINT "FK_06b92ea68548aa7e64b094b5d6a"`);
        await queryRunner.query(`DROP TABLE "comment_file"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "post_file"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post_comment"`);
        await queryRunner.query(`DROP TABLE "post_like"`);
    }

}
