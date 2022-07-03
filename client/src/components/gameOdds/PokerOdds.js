import React from 'react';
import styles from './PokerOdds.module.css';

const PokerOdds = () => {
    return (
        <section className={`${styles.PokerOdds} container mx-auto my-4 py-8 row-span-2`}>
            <table className={`table-auto w-full pt-2 pb-2 font-bold text-white bg-black bg-opacity-80 py-6 text-xs md:text-base lg:text-lg`}>
                <thead>
                    <tr>
                        <th scope="col">Hand</th>
                        <th scope="col">Payoff</th>
                        <th scope="col">Hand</th>
                        <th scope="col">Payoff</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Royal Flush</td>
                        <td>x 250</td>
                        <td>Straight</td>
                        <td>x 4</td>
                    </tr>
                    <tr>
                        <td>Straight Flush</td>
                        <td>x 50</td>
                        <td>3 of a Kind</td>
                        <td>x 3</td>
                    </tr>
                    <tr>
                        <td>4 of a Kind</td>
                        <td>x 25</td>
                        <td>2 Pair</td>
                        <td>x 2</td>
                    </tr>
                    <tr>
                        <td>Full House</td>
                        <td>x 9</td>
                        <td>Jacks or Better</td>
                        <td>x 1</td>
                    </tr>
                    <tr>
                        <td>Flush</td>
                        <td>x 6</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </section>
    );
};

export default PokerOdds;
