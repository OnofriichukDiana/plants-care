import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707142747368 implements MigrationInterface {
    name = 'Migrations1707142747368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_message_file" ("id" SERIAL NOT NULL, "chatMessageId" integer NOT NULL, "mediaId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80a29e74b0e34ccf454b9c72122" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_message" ("id" SERIAL NOT NULL, "message" text, "isViewed" boolean NOT NULL DEFAULT false, "fromUserId" integer NOT NULL, "toUserId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_message_file" ADD CONSTRAINT "FK_08d01634e7058d5a538de150e4c" FOREIGN KEY ("chatMessageId") REFERENCES "chat_message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message_file" ADD CONSTRAINT "FK_672c712be746e26d74f32e4a2df" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_79a26e7a4d9afa5e4fc05f134ed" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_25e097b51d7622c249452c6f757" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_25e097b51d7622c249452c6f757"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_79a26e7a4d9afa5e4fc05f134ed"`);
        await queryRunner.query(`ALTER TABLE "chat_message_file" DROP CONSTRAINT "FK_672c712be746e26d74f32e4a2df"`);
        await queryRunner.query(`ALTER TABLE "chat_message_file" DROP CONSTRAINT "FK_08d01634e7058d5a538de150e4c"`);
        await queryRunner.query(`DROP TABLE "chat_message"`);
        await queryRunner.query(`DROP TABLE "chat_message_file"`);
    }

}
