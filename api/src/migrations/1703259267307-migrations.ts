import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703259267307 implements MigrationInterface {
    name = 'Migrations1703259267307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_to_user" ("id" SERIAL NOT NULL, "subscriberId" integer NOT NULL, "subscriptionId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a8edf9e1f9e479ad3246146ca83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countSubscribers" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countSubscriptions" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_to_user" ADD CONSTRAINT "FK_81f9b1cf95021f0b269978a5a5b" FOREIGN KEY ("subscriberId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_user" ADD CONSTRAINT "FK_196441ef38c1202d4fd43f23d3e" FOREIGN KEY ("subscriptionId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_user" DROP CONSTRAINT "FK_196441ef38c1202d4fd43f23d3e"`);
        await queryRunner.query(`ALTER TABLE "user_to_user" DROP CONSTRAINT "FK_81f9b1cf95021f0b269978a5a5b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countSubscriptions"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countSubscribers"`);
        await queryRunner.query(`DROP TABLE "user_to_user"`);
    }

}
