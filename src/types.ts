export interface TaskEvaluation {
    id: string;
    criterion: string;
    score: number; // 0-100%
    weight: number;
}

export interface BusinessTask {
    id: string;
    title: string;
    description: string; // Markdown
    createdAt: number;
    deadline: number | null; // Timestamp
    status: 'pending' | 'completed' | 'cancelled' | 'expired';
    evaluation: TaskEvaluation[];
}
