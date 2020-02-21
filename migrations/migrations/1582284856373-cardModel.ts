import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class cardModel1582284856373 implements MigrationInterface {
  name: string = 'cardModel1582284856373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Card" ("id" SERIAL NOT NULL, "card_id" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "Card_User" UNIQUE ("userId", "card_id"), CONSTRAINT "PK_61f0f1076b00742cedc04ff0329" PRIMARY KEY ("id"))',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "FK_f73a534d3e716969f3419a4959b" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "FK_f73a534d3e716969f3419a4959b"', undefined);
    await queryRunner.query('DROP TABLE "Card"', undefined);
  }
}
