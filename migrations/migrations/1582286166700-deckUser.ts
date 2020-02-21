import {MigrationInterface, QueryRunner} from "typeorm";

export class deckUser1582286166700 implements MigrationInterface {
    name = 'deckUser1582286166700'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Deck" ADD "userId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "Deck" ADD CONSTRAINT "Deck_User" UNIQUE ("class", "userId")`, undefined);
        await queryRunner.query(`ALTER TABLE "Deck" ADD CONSTRAINT "FK_6080f0f6ccda075362cd378a0b1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Deck" DROP CONSTRAINT "FK_6080f0f6ccda075362cd378a0b1"`, undefined);
        await queryRunner.query(`ALTER TABLE "Deck" DROP CONSTRAINT "Deck_User"`, undefined);
        await queryRunner.query(`ALTER TABLE "Deck" DROP COLUMN "userId"`, undefined);
    }

}
