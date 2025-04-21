import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  return (
    <div>
      <Sidebar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(!modalOpen)}/>
          <div className="flex justify-end gap-4">
            <Button onClick={() => setModalOpen(true)} startIcon={<PlusIcon size={"md"}/>} size="md" variant="primary" text="Add Content"/>
            <Button onClick={async() => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              })
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }} startIcon={<ShareIcon size={"md"}/>} size="md" variant="secondary" text="Share Brain"/>
          </div>

          <div className="flex gap-4 flex-wrap">
            {contents.map(({type, link, title}) => <Card type={type} link={link} title={title}/>
            )}
          </div>
      </div>
    </div>
  )
}

