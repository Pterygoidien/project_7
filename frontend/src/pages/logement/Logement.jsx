import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import Carousel from "../../components/carousel/Carousel";
import LogementContext from "../../context/logementContext";

import styles from "./Logement.module.scss";


const Logement = () => {
    const id = useParams().id;
    const logementContext = useContext(LogementContext);
    const { getLogement, logement } = logementContext;


    useEffect(() => {
        getLogement(id)
        // eslint-disable-next-line
    }, []);


    return (
        <main className="container">
            {!logement && <h1>Logement introuvable</h1>}
            {logement && (
                <>
                    <Carousel pictures={logement.pictures} />
                    <div className="flex flex-expand items-center">
                        <section className="rental-highlight flex flex-col gap-2">
                            <h1>
                                {logement.title}
                            </h1>
                            <h2>
                                {logement.location}
                            </h2>
                            <div className="flex justify-start gap-3 ">
                                {logement.tags && logement.tags.map((tag) => (
                                    <Button key={tag}>{tag}</Button>

                                ))}
                            </div>

                        </section>
                        <section className="rental-infos flex justify-between items-center">
                            <div className="rental-infos__rating grow">
                                <span>{logement.rating}</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                            <div className="rental-infos__author flex">
                                <div className="flex flex-col justify-center items-end gap-2">
                                    {logement.host.name.split(" ").map((name) => (
                                        <span key={name}>{name}</span>
                                    ))
                                    }

                                </div>
                                <div className={styles['author__picture']}>
                                    <img src={logement.host.picture} alt={logement.host.name} />
                                </div>


                            </div>
                        </section>
                    </div>

                    <section className={`${styles['rental-accordions']} flex flex-responsive items-stretch gap-4`}>
                        <Accordion titre="Description"><p>{logement.description}</p></Accordion>
                        <Accordion titre="Equipements">
                            {logement.equipments ? (<ul>
                                {logement.equipments.map((equipment) => {
                                    return (<li key={equipment}>{equipment}</li>)
                                })} </ul>) : 'Aucun équipement'}
                        </Accordion>
                    </section>

                </>)}


        </main>
    )
}

export default Logement;
