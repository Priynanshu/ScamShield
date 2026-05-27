import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportToCommunitySlice, fetchAllReportsMessagesSlcie, clearReportError } from "../features/reportSlice";


const useReport = () => {
    const dispatch = useDispatch()
    const {reportsMessages, allReportedMessages, reportError, reportLoading} = useSelector((state) => state.report)

    const reportToCommunityHook = useCallback(async (scamId) => {
        try {
            return await dispatch(reportToCommunitySlice(scamId))
        }catch(err) {
            throw err
        }
    })

    const fetchAllReportsMessagesHook = useCallback(async () => {
        try {
            return await dispatch(fetchAllReportsMessagesSlcie())
        }catch(err) {
            throw err
        }
    })

    const clearErrorHook = useCallback(() => {
        return dispatch(clearReportError())
    })

    return {
        reportsMessages,
        allReportedMessages,
        reportError,
        reportLoading,
        reportToCommunityHook,
        fetchAllReportsMessagesHook,
        clearReportError: clearErrorHook
    }
}

export default useReport