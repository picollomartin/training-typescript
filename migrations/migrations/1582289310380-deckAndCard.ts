import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class deckAndCard1582289310380 implements MigrationInterface {
  name: string = 'deckAndCard1582289310380';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE "deck_cards__card" ("deckId" integer NOT NULL, "cardId" integer NOT NULL, CONSTRAINT "PK_6a6bcb0176e9d7730c5527605f0" PRIMARY KEY ("deckId", "cardId"))',
      undefined
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_585171eb0a6d15ae237d62b24a" ON "deck_cards__card" ("deckId") ',
      undefined
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_23f68819714353505838f4831a" ON "deck_cards__card" ("cardId") ',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "deck_cards__card" ADD CONSTRAINT "FK_585171eb0a6d15ae237d62b24af" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "deck_cards__card" ADD CONSTRAINT "FK_23f68819714353505838f4831ae" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE "deck_cards__card" DROP CONSTRAINT "FK_23f68819714353505838f4831ae"',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "deck_cards__card" DROP CONSTRAINT "FK_585171eb0a6d15ae237d62b24af"',
      undefined
    );
    await queryRunner.query('DROP INDEX "IDX_23f68819714353505838f4831a"', undefined);
    await queryRunner.query('DROP INDEX "IDX_585171eb0a6d15ae237d62b24a"', undefined);
    await queryRunner.query('DROP TABLE "deck_cards__card"', undefined);
  }
}
