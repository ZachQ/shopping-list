import type { Dispatch } from "@reduxjs/toolkit/react";
import { addItem, deleteItem, editItem, setItems, setLoading, toggleCompleted } from "./shoppingSlice";
import api from '../../api/axios';

export const fetchItems = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await api.get('/shopping-items');
        dispatch(setItems(response.data));
    } catch (error) {
        console.error('Fetch failed', error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const postItem = (itemName: string, quantity: number, description: string) =>
    async (dispatch: Dispatch) => {
        try {
            const response = await api.post('/shopping-items', { itemName, quantity, description });
            dispatch(addItem(response.data.id, response.data.itemName, response.data.quantity, response.data.description));
        } catch (error) {
            console.error('Post failed', error);
        }
    };

export const updateItem = (item: {
    id: string;
    itemName: string;
    quantity: number;
    description?: string;
    completed: boolean;
}) => async (dispatch: Dispatch) => {
    try {
        const response = await api.put(`/shopping-items/${item.id}`, item);
        dispatch(editItem(response.data));
    } catch (error) {
        console.error('Update failed', error);
    }
};

export const deleteItemThunk = (id: string) => async (dispatch: Dispatch) => {
    try {
        await api.delete(`/shopping-items/${id}`);
        dispatch(deleteItem(id));
    } catch (error) {
        console.error('Delete failed', error);
    }
};

export const toggleCompletedThunk = (id: string, currentCompleted: boolean) => async (dispatch: Dispatch) => {
    try {
        await api.patch(`/shopping-items/${id}`, { completed: !currentCompleted });
        dispatch(toggleCompleted(id));
    } catch (error) {
        console.error('Toggle completed failed', error);
    }
};