import { getAllChapters } from '@/lib/chapters'
import AccountClient from './AccountClient'

export default function AccountPage() {
  const totalChapters = getAllChapters().length
  return <AccountClient totalChapters={totalChapters} />
}
