import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../components/navs/TopNav';
import MainHeader from '../../components/headers/MainHeader';
import GamePreview from '../../components/previews/GamePreview';

const Home = () => {
    return (
        <div className={`Home w-full h-full m-0 bg-black`}>
            <TopNav />
            <MainHeader />
            <div className={`HomeMain w-full m-0 p-2 h-min-full`}>
                <div className={`container flex flex-col items-center mx-auto py-9`}>
                    <h1 className={`text-center p-4 my-5 text-azure font-bangers text-4xl md:text-5xl`} id={`Home_title`}
                        data-aos="fade-down"
                        data-aos-easing="ease-out-cubic"
                        data-aos-delay="500"
                    >Welcome To Casino Madness</h1>
                    <button className={`text-center text-azure bg-red-blood rounded-full py-3 px-6 my-3`}
                        data-aos="fade-up"
                        data-aos-easing="ease-out-cubic"
                        data-aos-delay="600"
                    ><Link to="/register">Start Playing!</Link></button>
                </div>
                <div className={`flex flex-col items-center bg-cFloor bg-no-repeat bg-cover`}>
                    <h1 className={`text-center py-4 my-4 text-azure font-bangers text-2xl md:text-4xl`}>Our Games</h1>
                    <div className={`grid grid-cols-1 p-8 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-3`}>
                        <GamePreview img={"poker.png"} theme={"Harley Quinn and Joker"} msg={"Join the fun with 5 card draw.  Try your luck against the house."} route={"/poker"} />
                        <GamePreview img={"blackjack.png"} theme={"Superman and Lex Luther"} msg={"Classic BlackJack with a super-hero twist.  Try your luck against the dealer."} route={"/blackjack"} />
                        <GamePreview img={"coming.png"} theme={"Two-Face"} msg={"A roll of the dice is all you need. Classic craps is where it's at."} />
                        <GamePreview img={"coming.png"} theme={"Gotham Slots"} msg={"Nothing like the sounds of money to brighten the darkness of Gotham City."} route={"/gothamslots"} />
                        <GamePreview img={"coming.png"} theme={"Harley Quinn and Joker"} msg={"Join the fun with 5 card draw.  Try your luck against the house."} />
                        <GamePreview img={"coming.png"} theme={"Harley Quinn and Joker"} msg={"Join the fun with 5 card draw.  Try your luck against the house."} />
                        <GamePreview img={"coming.png"} theme={"Harley Quinn and Joker"} msg={"Join the fun with 5 card draw.  Try your luck against the house."} />
                        <GamePreview img={"coming.png"} theme={"Harley Quinn and Joker"} msg={"Join the fun with 5 card draw.  Try your luck against the house."} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
