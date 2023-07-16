import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  /**
   * Получаемая entity приходящая от клиента.
   * Конструктор отрабатывает во время сборки и во время запроса когда идет обращение к модели.
   * Приходящая entity от клиента это по сути те самые приходящие данные.
   * Object.assign() назначает поля автоматом.
   * По сути такая логика:
   * Чистим приходящий request через пайпы и отдаем в сервис
   * Затем в репозитории сохраняется.
   */
  constructor(entity: Partial<Review>) {
    Object.assign(this, entity);

    /**
     * Либо второй вариант это
     * this.Title = entity.Title
     * this.name = entity.name
     * this.description = entity.description
     */
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
