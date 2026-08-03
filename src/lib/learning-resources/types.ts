export type LearningTopic = "react" | "vue";

export type TopicFilter = "all" | LearningTopic;

export type LearningResource = {
  id: number;
  title: string;
  topic: LearningTopic;
  minutes: number;
};

export type CreateResourceInput = Pick<LearningResource, "title" | "topic">;
