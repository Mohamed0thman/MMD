export type Level = {
  id: number;
  title: string;
  subtitle: string;
  units_count: number;
  lessons_count: number;
  user_lesson_reads: number;
};

export interface Unit {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  attachment_url: string;
}

export type LevelItemProps = {
  level: Level;
  onPress: () => void;
};
export type LessonItemProps = {
  lesson: Lesson;
  onPress: () => void;
  isEven: boolean;
};
