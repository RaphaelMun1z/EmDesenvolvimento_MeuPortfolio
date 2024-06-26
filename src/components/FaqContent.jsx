import styles from './FaqContent.module.scss'

// Icons
import { IoIosArrowForward } from "react-icons/io";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

import { useState } from 'react';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Link } from 'react-router-dom'

const FaqContent = ({ button = false }) => {
    const el = useRef(null);
    const tl = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const testimonialsElements = el.current.querySelectorAll('.item');

        tl.current = gsap.timeline({
            scrollTrigger: {
                trigger: testimonialsElements,
                scrub: true,
                start: "top 400px",
                end: "bottom 200px",
            }
        })
            .fromTo(testimonialsElements, // Selecione os elementos
                { opacity: 0, y: -150 }, // De
                { opacity: 1, y: 0, stagger: 0.2 } // Para
            );

        return () => {
            tl.current.kill();
        };
    }, []);

    const [faq, setFaq] = useState([
        {
            "pergunta": "Em quanto tempo meu projeto ficaria pronto?",
            "resposta": "O prazo de conclusão do projeto depende da sua complexidade e dos requisitos específicos. Após uma análise detalhada do escopo, podemos fornecer uma estimativa precisa do tempo necessário para concluir o projeto."
        },
        {
            "pergunta": "Quais são os custos envolvidos no desenvolvimento do meu projeto?",
            "resposta": "Os custos do projeto variam de acordo com a complexidade, tamanho e tempo necessário para conclusão. Após discutirmos os detalhes do projeto, forneceremos um orçamento transparente e personalizado."
        },
        {
            "pergunta": "Você pode trabalhar com o meu orçamento?",
            "resposta": "Sim, estamos abertos a discutir diferentes opções de pagamento e acomodar seu orçamento da melhor forma possível. Nos informe sobre suas restrições financeiras e trabalharemos juntos para encontrar uma solução adequada."
        },
        {
            "pergunta": "Como será a comunicação durante o desenvolvimento do projeto?",
            "resposta": "Manteremos uma comunicação regular e transparente durante todo o processo de desenvolvimento. Podemos nos comunicar por e-mail, telefone, videoconferência ou qualquer outra plataforma de sua preferência para garantir que você esteja sempre atualizado sobre o progresso do projeto."
        },
        {
            "pergunta": "Você oferece suporte após a conclusão do projeto?",
            "resposta": "Sim, estamos comprometidos em fornecer suporte contínuo após a conclusão do projeto. Se surgirem quaisquer problemas ou se você precisar de atualizações adicionais, estaremos disponíveis para ajudá-lo e garantir a funcionalidade contínua do seu projeto."
        },
        {
            "pergunta": "Quais são os principais marcos ou etapas do processo de desenvolvimento?",
            "resposta": "Nossos principais marcos ou etapas do processo de desenvolvimento incluem: análise e definição de requisitos, design e prototipagem, desenvolvimento de código, testes e depuração, implementação e lançamento, seguidos por manutenção e suporte contínuo."
        },
    ])

    const [expandedItems, setExpandedItems] = useState(Array(faq.length).fill(false));

    const handleFaq = (index) => {
        const newExpandedItems = [...expandedItems];
        newExpandedItems[index] = !newExpandedItems[index];
        setExpandedItems(newExpandedItems);
    };

    return (
        <section ref={el}>
            <div className={`${styles.header} item`}>
                <h1>FAQ</h1>
            </div>
            <div className={styles.contentContainer} >
                <div className={styles.division}>
                    {faq.slice(0, 3).map((f, index) => (
                        <div className={`${styles.item} item`} key={index} onClick={() => handleFaq(index)}>
                            <div className={styles.question}>
                                <p>{f.pergunta}</p>
                                {expandedItems[index] ? (
                                    <CgMathMinus />
                                ) : (
                                    <CgMathPlus />
                                )}
                            </div>
                            {expandedItems[index] && (
                                <div className={styles.answer}>{f.resposta}</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.division}>
                    {faq.slice(3, 8).map((f, index) => (
                        <div className={`${styles.item} item`} key={index} onClick={() => handleFaq(index + 5)}>
                            <div className={styles.question}>
                                <p>{f.pergunta}</p>
                                {expandedItems[index + 5] ? (
                                    <CgMathMinus />
                                ) : (
                                    <CgMathPlus />
                                )}
                            </div>
                            {expandedItems[index + 5] && (
                                <div className={styles.answer}>{f.resposta}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {button && (
                <Link to="/faq" className={styles.faqLink}>FAQ completa<IoIosArrowForward /></Link>
            )}
        </section>
    )
}

export default FaqContent