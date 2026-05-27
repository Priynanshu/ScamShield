import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scamDetectOfTextSlice, fetchMessagesSlice, scamDetectOfImageSlice, scamDetectOfUrlSlice, clearScanError } from "../features/scanSlice";

const useScan = () => {
    const dispatch = useDispatch();
    const { aiResult, scanError, scanLoading, totalMessages } = useSelector((state) => state.scan);

    const scamDetectOfTextHook = useCallback(async (message) => {
        try {
            return await dispatch(scamDetectOfTextSlice(message));
        } catch(err) {
            throw err;
        }
    }, [dispatch]);

    const scamDetectOfUrlHook = useCallback(async (url) => {
        try {
            return await dispatch(scamDetectOfUrlSlice(url));
        } catch(err) {
            throw err;
        }
    }, [dispatch]);

    const scamDetectOfImageHook = useCallback(async (image) => {
        try {
            return await dispatch(scamDetectOfImageSlice(image));
        } catch(err) {
            throw err;
        }
    }, [dispatch]);

    const fetchMessagesHook = useCallback(async (id) => {
        try {
            return await dispatch(fetchMessagesSlice(id));
        } catch(err) {
            throw err;
        }
    }, [dispatch]);

    const clearScanErrorHook = useCallback(() => {
        dispatch(clearScanError());
    }, [dispatch]);

    return {
        aiResult,
        scanError,
        scanLoading,
        scamDetectOfTextHook,
        scamDetectOfUrlHook,
        scamDetectOfImageHook,
        fetchMessagesHook,
        clearScanError: clearScanErrorHook,
        totalMessages
    };
};

export default useScan;