import ReportComments from '@/components/ReportComments';
import { useLocalSearchParams } from 'expo-router';

export default function ReportCommentsPage() {
  const { id } = useLocalSearchParams();
  return <ReportComments reportId={Array.isArray(id) ? id[0] : id} />;
}