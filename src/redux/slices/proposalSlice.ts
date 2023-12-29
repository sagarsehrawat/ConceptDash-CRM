import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface ProposalState {
    percentage: number,
    newProposals: number,
    wonProposals: number,
    lostProposals: number,
    totalProposals: number,
    proposals: Proposal[],
}

interface ProposalStatus {
    percentage: number,
    newProposals: number,
    wonProposals: number,
    lostProposals: number,
    totalProposals: number,
}

const initialState: ProposalState = {
    percentage: 0,
    newProposals: 0,
    wonProposals: 0,
    lostProposals: 0,
    totalProposals: 0,
    proposals: [],
}

export const proposalSlice = createSlice({
    name: 'proposals',
    initialState,
    reducers: {
        initproposals: (state, action: PayloadAction<Proposal[]>) => {
            state.proposals = action.payload.map(proposal => ({
                ...proposal,
                question_deadline: moment(proposal.question_deadline),
                closing_deadline: moment(proposal.closing_deadline),
                created_at: moment(proposal.created_at),
            }));
        },
        initData: (state, action: PayloadAction<ProposalStatus>) => {
            state.newProposals = action.payload.newProposals;
            state.totalProposals = action.payload.totalProposals;
            state.wonProposals = action.payload.wonProposals;
            state.lostProposals = action.payload.lostProposals;
            state.percentage = action.payload.percentage;
        },
        addProposal: (state, action: PayloadAction<Proposal>) => {
            state.proposals = [action.payload, ...state.proposals];
          },
        updateProposal: (state, action: PayloadAction<{ proposalId: number; data: Partial<Proposal>}>) => {
            const { proposalId, data} = action.payload;
                state.proposals = state.proposals.map((proposal) =>
                    proposal.proposal_id === proposalId ? { ...proposal, ...data } : proposal
                );
        },
        deleteProposal: (state, action: PayloadAction<string | number>) => {
            const proposalIdToDelete = action.payload;
            state.proposals = state.proposals.filter((proposal) => proposal.proposal_id !== proposalIdToDelete);
          },
    }
});

export const selectNewProposals = (state: { proposals: ProposalState }) => state.proposals.newProposals
export const selecteNewPercentage = (state: { proposals: ProposalState }) => state.proposals.percentage
export const selectTotalProposals = (state: { proposals: ProposalState }) => state.proposals.totalProposals
export const selectWonProposals = (state: { proposals: ProposalState }) => state.proposals.wonProposals
export const selectLostProposals = (state: { proposals: ProposalState }) => state.proposals.lostProposals
export const selectProposals = (state: { proposals : ProposalState }) => state.proposals.proposals

export const {initData, initproposals, addProposal, updateProposal, deleteProposal} = proposalSlice.actions

export default proposalSlice.reducer