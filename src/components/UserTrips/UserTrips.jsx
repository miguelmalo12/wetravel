import "./UserTrips.scss";
import { useRecoilState } from 'recoil';
import { modalState } from '../../state/modalState';

// icons
import { ReactComponent as DateIcon } from '../../assets/icons/date.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

//components
import Modal from "../Modal/Modal";


function UserTrips() {
    const [isModalOpen, setModalOpen] = useRecoilState(modalState);

    const handleDeleteClick = () => {
        setModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        // To do: delete the trip
        setModalOpen(false);
      };

    const handleCloseModal = () => {
        setModalOpen(false);
      }

  return (
    <div className="trips">
      <h2>Your Trips</h2>
      <div className="trips--container">
        <div className="trips--container__info">
          <div className="trips--container__info--entry">
            <p>Destination</p>
            <h5>Madrid</h5>
          </div>
          <div className="trips--container__info--entry">
            <p>From</p>
            <h5>12 Nov, 2023</h5>
          </div>
          <div className="trips--container__info--entry">
            <p>To</p>
            <h5>16 Nov, 2023</h5>
          </div>
          <div
            onClick={() => handleDeleteClick()}
            className="trips--container__info__delete"
          >
            <p>Delete</p>
            <DeleteIcon />
          </div>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              textContent={`Are you sure you want to delete the event?`}
              buttonText="Delete"
              onButtonClick={handleDeleteConfirm}
              onCloseClick={handleCloseModal}
            ></Modal>
          )}
        </div>

        <div className="trips--container__view">
          <DateIcon />
          <p>View Trip</p>
        </div>
      </div>
    </div>
  );
}

export default UserTrips