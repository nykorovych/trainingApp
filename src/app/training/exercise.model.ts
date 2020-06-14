export interface Exercise {
    id: string,
    name: string,
    duration: number,
    calories: number,
    data?: Date,
    state?: 'completed'| 'cancelled' | null

}