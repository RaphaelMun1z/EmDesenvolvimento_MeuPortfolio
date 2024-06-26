import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formSubjectService from "../services/formSubjectService";

const initialState = {
    formSubjects: [],
    formSubject: null,
    error: false,
    success: false,
    loading: false,
}

// Create a form subject
export const createFormSubject = createAsyncThunk(
    "formSubject/create",
    async (formSubject, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token
        const data = await formSubjectService.createFormSubject(formSubject, token)

        // Check for errors
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }

        return data
    }
)

// Get form subjects
export const getFormSubjects = createAsyncThunk(
    "formSubject/getFormSubjects",
    async () => {
        const data = await formSubjectService.getFormSubjects()

        return data
    }
)

// Delete a form subject
export const deleteFormSubject = createAsyncThunk(
    "formSubject/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await formSubjectService.deleteFormSubject(id, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const getFormSubjectsByFormType = createAsyncThunk(
    "formSubject/getFormSubjectsByType",
    async (type) => {
        const data = await formSubjectService.getFormSubjectsByFormType(type)

        return data
    }
)

export const formSubjectSlice = createSlice({
    name: "formSubject",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.loading = false
            state.error = false
            state.success = false
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFormSubject.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(createFormSubject.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.formSubject = action.payload
                state.message = "Assunto cadastrado com sucesso!"
            })
            .addCase(createFormSubject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.formSubject = {}
            })
            .addCase(getFormSubjects.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getFormSubjects.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.formSubjects = action.payload
            })
            .addCase(deleteFormSubject.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteFormSubject.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.formSubjects = state.formSubjects.filter((formSubject) => {
                    return formSubject.id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(deleteFormSubject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.formSubject = {}
            })
            .addCase(getFormSubjectsByFormType.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getFormSubjectsByFormType.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.formSubjects = action.payload
            })
    },
})

export const { resetMessage } = formSubjectSlice.actions
export default formSubjectSlice.reducer