import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    reportToCommunitySlice,
    fetchAllReportsMessagesSlcie,
    clearReportError,
    clearCommunityCache,
    markRelatableSlice,
    fetchStatsSlice
} from "../features/reportSlice";

const useReport = () => {
    const dispatch = useDispatch();
    const { reportsMessages, relatableCount, allReportedMessages, reportError, reportLoading, stats, statsLoading } =
        useSelector((state) => state.report);

    const reportToCommunityHook = useCallback(async (scamId) => {
        return await dispatch(reportToCommunitySlice(scamId));
    }, [dispatch]);

    const fetchAllReportsMessagesHook = useCallback(async () => {
        return await dispatch(fetchAllReportsMessagesSlcie());
    }, [dispatch]);

    const markRelatableHook = useCallback(async (scamId) => {
        return await dispatch(markRelatableSlice(scamId));
    }, [dispatch]);

    const fetchStatsHook = useCallback(async () => {
        return await dispatch(fetchStatsSlice());
    }, [dispatch]);

    const clearErrorHook = useCallback(() => {
        dispatch(clearReportError());
    }, [dispatch]);

    const clearCacheHook = useCallback(() => {
        dispatch(clearCommunityCache());
    }, [dispatch]);

    return {
        reportsMessages,
        relatableCount,
        allReportedMessages,
        reportError,
        reportLoading,
        stats,
        statsLoading,
        reportToCommunityHook,
        fetchAllReportsMessagesHook,
        markRelatableHook,
        fetchStatsHook,
        clearReportError: clearErrorHook,
        clearCommunityCache: clearCacheHook,
    };
};

export default useReport;
