import { useUserStore } from '@components/core/store/useIUserStore.ts';
import ControlledFormData from '@components/form/controlled';
import UncontrolledFormData from '@components/form/uncontrolled';
import Modal from '@components/modal';
import { useState } from 'react';

function App() {
  const [openModal, setOpenModal] = useState<null | 'controlled.test.tsx' | 'uncontrolled'>(null);
  const userData = useUserStore((state) => state.userData);

  return (
    <div>
      <button onClick={() => setOpenModal('uncontrolled')}>uncontrolled</button>
      <button onClick={() => setOpenModal('controlled.test.tsx')}>controlled</button>

      {openModal === 'uncontrolled' && (
        <Modal onClose={() => setOpenModal(null)}>
          <UncontrolledFormData onClose={() => setOpenModal(null)} />
        </Modal>
      )}

      {openModal === 'controlled.test.tsx' && (
        <Modal onClose={() => setOpenModal(null)}>
          <ControlledFormData onClose={() => setOpenModal(null)} />
        </Modal>
      )}
      {userData && (
        <div style={{ margin: '0 auto' }}>
          <h3>User data:</h3>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Age:</strong> {userData.age}
          </p>
          <p>
            <strong>Gender:</strong> {userData.gender}
          </p>
          <p>
            <strong>Country:</strong> {userData.country}
          </p>
          {userData.avatarBase64 && (
            <img
              src={userData.avatarBase64}
              alt="Avatar"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
