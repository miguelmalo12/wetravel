import './RecommendCard.scss';
import globeIcon from '../../assets/icons/World.svg';
import { ButtonPrimary } from '../Button/Button';
import { useState } from 'react';

const RecommendCard = ({ cityName, countryName, imageURL, imageALT, setRecommendation }) => {
    const [counter, setCounter] = useState(0)
    const [loader, setLoader] = useState(false)
    const recommendationList = JSON.parse(localStorage.getItem('recommendationList'))

    const handleNewRecommend = () => {
        setLoader(true)
        setTimeout(() => {
            let newCounter;
            if (counter === recommendationList.length - 1) {
                newCounter = 0;
            } else {
                newCounter = counter + 1;
            }
            setCounter(newCounter);
            setRecommendation(recommendationList[newCounter]);
            setLoader(false)
        }, 2000)

    }

    return (
        <section className="recommend-card">
            <div className="recommend-card__text-container">
                <h6 className="heading--secondary recommend-card__text">Your Perfect Match <img src={globeIcon} alt="" className="" /></h6>
                <h1>{`${cityName}, ${countryName}`}</h1>
                {
                    !loader ? (<button onClick={handleNewRecommend} className="recommend-card__button">Recommend Me Another Destination
                        <svg className='recommend-card__icon' xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                            <path d="M0.279241 13.577C-0.0930805 13.1941 -0.0930806 12.5732 0.279241 12.1902L5.32543 6.99985L0.279241 1.80949C-0.093081 1.42653 -0.0930811 0.805626 0.279241 0.422667C0.651563 0.0397062 1.25522 0.0397062 1.62754 0.422666L7.34788 6.30644C7.7202 6.6894 7.7202 7.3103 7.34788 7.69326L1.62754 13.577C1.25522 13.96 0.651563 13.96 0.279241 13.577Z" fill="#FD5056" />
                        </svg>
                    </button>) : (<button onClick={handleNewRecommend} className="recommend-card__button recommend-card__button--loader">   <l-ring stroke='2.5' color='#FD5056' size='18'></l-ring>
                        Loading
                    </button>)
                }



            </div>
            <div className="recommend-card__image-container">
                <img src={imageURL} alt={imageALT} className="recommend-card__image" />
                <ButtonPrimary text='Go to Planner' to='/plan' className='recommend-card__button-primary' />
            </div>
        </section>
    )
}

export default RecommendCard