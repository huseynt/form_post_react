import {useState} from "react";
import style from './style.module.scss';
import axios from 'axios';

const Home = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [data, setData] = useState<object>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target

        if (type === 'checkbox') {
            setData(prevData => {
                const currentArray = Array.isArray(prevData[name]) ? prevData[name] : [];
                if (checked) {
                    return {...prevData, [name]: [...currentArray, value]};
                } else {
                    return {...prevData, [name]: currentArray.filter((item: string) => item !== value)};
                }
            });
        } else {
            setData({...data, [name]: value})
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitted(true)
        console.log(data)
        
        // ------------------------------------- POST / LOCALSTORAGE ------------------------------------------
        async function fetchData() {
            try {
                const response = await axios.post(
                    "https://project-1c8ba2.apibrew.io:8443/form",data, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tL2FwaWJyZXcvYXBpYnJldyIsInN1YiI6ImNvbnRyb2xsZXIiLCJhdWQiOlsiZ2l0aHViLmNvbS9hcGlicmV3L2FwaWJyZXciXSwiZXhwIjoxNzIxMjM3ODA0LCJuYmYiOjE3MTYwNTM4MDQsImlhdCI6MTcxNjA1MzgwNCwianRpIjoiMTdmMWI3NzktNDA0Yy00ZmJkLWFjM2ItOTRlYjk3ODAxZjhkIiwidXNlcm5hbWUiOiJjb250cm9sbGVyIiwidWlkIjoiOTUzNGU4ODktM2VjYy00ODdmLTk5YTQtMTdkYmYxZTIyYTNhIiwic2NvcGVzIjpbIjo6RlVMTDo6Ojo6OkFMTE9XIl0sInBlcm1pc3Npb25zIjpbeyJpZCI6IjA1ZmMxZWRmLTgyODAtNGJkZC05NzhiLTlmYmJkYWE3OTgxOCIsInZlcnNpb24iOjEsIm9wZXJhdGlvbiI6IkZVTEwiLCJwZXJtaXQiOiJBTExPVyJ9LHsiaWQiOiIwNWZjMWVkZi04MjgwLTRiZGQtOTc4Yi05ZmJiZGFhNzk4MTgiLCJ2ZXJzaW9uIjoxLCJvcGVyYXRpb24iOiJGVUxMIiwicGVybWl0IjoiQUxMT1cifV19.r920itFr5jfSbag-olcNu3bWhcvvexy-JWU1uSZXyAuzlkct8zNPYejigpXmQE9YINcjPVR9c7_VCb_i0wwUc2jHGihGqbn7HpZrycUqJVd6fP4Y_SrnjUT2ZTw3XAHcCn3wDkLod67AfmGr69TSLndxr5zyZHwdUfpxB4w2F0U'
                    }
                });
                console.log(response.data.id)
                const user = {
                    id: response.id,
                    userName: data.userName,
                    description: data.description,
                    language: data.language,
                    marriage: data.marriage
                };
                localStorage.setItem(response.data.id,JSON.stringify(user));

            } catch (error) {
                console.log(error)
            }
        }   
        fetchData()

        
        // --------------------------------------------------------------------

        setTimeout(() => {
            setIsSubmitted(false)
            setData({})
        }, 2000)
    }

    //?? validation => home work with error messages
    //?? datalar should be stored => local storage
    //?? submit edilen deyerler api-ye post edilsin => axios, json-server ( db.json )


    return (
        <div className={style.form}>
            {
                isSubmitted ? (
                    <div>
                        <h1 className='text-2xl font-bold'>Form Submitted 🎉</h1>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} >
                        <div className='flex flex-col w-full max-w-[85%] my-[30px]'>
                                <span
                                    className='text font-mono text-lg italic font-semibold tracking-tight	text-orange-500'>Name *</span>
                            <input className='text font-mono text-lg p-4 border-4 rounded-md outline-0'
                                   type="text"
                                   name='userName'
                                   placeholder='Enter your name'
                                   onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div className='flex flex-col w-full max-w-[85%] my-[30px]'>
                                <span
                                    className='text font-mono text-lg italic font-semibold tracking-tight	text-orange-500'>Country *</span>
                            <select className='text font-mono text-lg p-4 border-4 rounded-md outline-0'
                                    name='country'
                                    onChange={(e) => handleInputChange(e)}
                            >
                                <option value="aze">Azerbaijan</option>
                                <option value="tur">Turkey</option>
                                <option value="rus">Russia</option>
                                <option value="usa">United States of America</option>
                            </select>
                        </div>

                        <div className='flex flex-col w-full max-w-[85%] my-[30px]'>
                                <span
                                    className='text font-mono text-lg italic font-semibold tracking-tight	text-orange-500'>Description *</span>
                            <textarea
                                className='text font-mono text-lg p-4 border-4 rounded-md outline-0'
                                name="description"
                                onChange={(e) => handleInputChange(e)}
                            ></textarea>
                        </div>

                        <div className='flex flex-col w-full max-w-[85%] my-[30px]'>
                                <span
                                    className='text font-mono text-lg italic font-semibold tracking-tight	text-orange-500'>Marriage? *</span>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>Married:</span>
                                <input type='radio'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='Married'
                                       name='marriage'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>Single:</span>
                                <input type='radio'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='Single'
                                       name='marriage'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>Divorce:</span>
                                <input type='radio'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='Divorce'
                                       name='marriage'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col w-full max-w-[85%] my-[30px]'>
                                <span
                                    className='text font-mono text-lg italic font-semibold tracking-tight	text-orange-500'>Language *</span>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>English:</span>
                                <input type='checkbox'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='English'
                                       name='language'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>Russian:</span>
                                <input type='checkbox'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='Russian'
                                       name='language'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div>
                                <span className='text font-mono text-lg text-yellow-500 mr-4'>Turkish:</span>
                                <input type='checkbox'
                                       className='text font-mono text-lg p-4 border-4 rounded-md outline-0 text-yellow-500'
                                       value='Turkish'
                                       name='language'
                                       onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>

                        <input type='submit'
                               className='w-[250px] transition-colors cursor-pointer rounded-md p-4 text font-mono text-lg text-white bg-orange-500 hover:bg-orange-700'
                               value='Submit'/>
                    </form>
                )
            }
        </div>
    )
}
export default Home;
