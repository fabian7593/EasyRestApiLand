import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleFunctionallity } from "./RoleFunctionallity";
import { RoleScreen } from "./RoleScreen";

@Index("code", ["code"], { unique: true })
@Index("idx_code", ["code"], {})
@Entity("screens", { schema: "easy_api_land_db" })
export class Screens {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "code", unique: true, length: 50 })
  code: string;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @OneToMany(
    () => RoleFunctionallity,
    (roleFunctionallity) => roleFunctionallity.screenCode2
  )
  roleFunctionallities: RoleFunctionallity[];

  @OneToMany(() => RoleScreen, (roleScreen) => roleScreen.screenCode2)
  roleScreens: RoleScreen[];
}
