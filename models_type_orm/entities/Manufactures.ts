import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("udc_industry_type", ["udcIndustryType"], {})
@Entity("manufactures", { schema: "easy_api_land_db" })
export class Manufactures {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 100 })
  city: string | null;

  @Column("varchar", { name: "state", nullable: true, length: 100 })
  state: string | null;

  @Column("varchar", { name: "zip_code", nullable: true, length: 20 })
  zipCode: string | null;

  @Column("varchar", { name: "country_iso_code", nullable: true, length: 3 })
  countryIsoCode: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "website", nullable: true, length: 255 })
  website: string | null;

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("varchar", { name: "udc_industry_type", nullable: true, length: 100 })
  udcIndustryType: string | null;

  @Column("text", { name: "notes", nullable: true })
  notes: string | null;

  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column("timestamp", {
    name: "updated_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedDate: Date | null;
}
