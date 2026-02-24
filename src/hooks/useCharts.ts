import { useGetChartQuery } from "@/app/api/dashboardApi";

const useCharts = () => {
    const { data: weekly, isLoading } = useGetChartQuery('weekly');
    const { data: monthly, isLoading: isLoadingMonthly } =  useGetChartQuery('monthly');
    return { weekly, monthly, isLoading : (isLoading || isLoadingMonthly) };
}

export default useCharts;