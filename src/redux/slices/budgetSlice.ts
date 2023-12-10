import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BudgetStatus {
    done: number,
    draft: number,
    notFound: number,
}

interface BudgetState extends BudgetStatus {
    cities: City[],
    budgets: Budget[],
}

const initialState: BudgetState = {
    done: 0,
    draft: 0,
    notFound: 0,
    cities: [],
    budgets: [],
}

export const projectSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        initCities: (state, action: PayloadAction<City[]>) => {
            state.cities = action.payload;
        },
        initBudgets: (state, action: PayloadAction<Budget[]>) => {
            state.budgets = action.payload;
        },
        initHeaderCards: (state, action: PayloadAction<BudgetStatus>) => {
            state.done = action.payload.done;
            state.draft = action.payload.draft;
            state.notFound = action.payload.notFound;
        },
        increment: (state, action: PayloadAction<'DONE' | 'NOT_FOUND' | 'DRAFT'>) => {
            switch (action.payload) {
                case 'DONE':
                    state.done = parseInt(state.done.toString()) + 1;
                    break;
                case 'DRAFT':
                    state.draft = parseInt(state.draft.toString()) + 1;
                    break;
                case 'NOT_FOUND':
                    state.notFound = parseInt(state.notFound.toString()) + 1;
                    break;
                default:
                    break;
            }
        },
        decrement: (state, action: PayloadAction<'DONE' | 'NOT_FOUND' | 'DRAFT'>) => {
            switch (action.payload) {
                case 'DONE':
                    state.done = parseInt(state.done.toString()) - 1;
                    break;
                case 'DRAFT':
                    state.draft = parseInt(state.draft.toString()) - 1;
                    break;
                case 'NOT_FOUND':
                    state.notFound = parseInt(state.notFound.toString()) - 1;
                    break;
                default:
                    break;
            }
        },
        updateCity: (state, action: PayloadAction<{ cityBudgetId: number; data: Partial<City> }>) => {
            const { cityBudgetId, data } = action.payload;

            state.cities = state.cities.map((city) =>
            city.city_budget_id === cityBudgetId
                    ? { ...city, ...data }
                    : city
            );
        },
        updateBudget: (state, action: PayloadAction<{ budgetId: number; data: Partial<Budget> }>) => {
            const { budgetId, data } = action.payload;

            state.budgets = state.budgets.map((budget) =>
                budget.budget_id === budgetId
                    ? { ...budget, ...data }
                    : budget
            );
        },
        deleteBudget: (state, action: PayloadAction<number>) => {
            const bdugetIdToDelete = action.payload;
            state.budgets = state.budgets.filter((budget) => budget.budget_id !== bdugetIdToDelete);
        }
    }
});

export const selectDoneBudgets = (state: { budgets: BudgetState}) => state.budgets.done;
export const selectDraftBudgets = (state: { budgets: BudgetState}) => state.budgets.draft;
export const selectNotFoundBudgets = (state: { budgets: BudgetState}) => state.budgets.notFound;
export const selectCities = (state: { budgets: BudgetState}) => state.budgets.cities;
export const selectBudgets = (state: { budgets: BudgetState}) => state.budgets.budgets;

export const { increment, decrement, initBudgets, initCities, initHeaderCards, deleteBudget, updateBudget, updateCity } = projectSlice.actions
export default projectSlice.reducer