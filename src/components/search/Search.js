import React, {useState} from 'react'
import tatOrter from '../../tatOrter'
import LangSearch from '../search/LanguageSearch'
import FrameSearch from '../search/FrameworkSearch'
import TextSearch from '../search/TextSearch'
import { useHistory } from 'react-router-dom'

function Search(props) {
    let [region, setRegion] = useState('');
    let [langCheck, setLangCheck] = useState('');
    let [frameCheck, setFrameCheck] = useState('');
    let [langList, setLangList] = useState([]);
    let [frameList, setframeList] = useState([]);

    let history = useHistory();
    
    const onChangeLang = (e) => {
        langCheck = e.target;
        console.log(langCheck.checked)
        if(langCheck.checked) {
            setLangCheck(langList.push(e.target.name));
        } else if(langCheck.checked === false) {
            switch (e.target.name) {
                case "javascript": 
                    langList.splice("javascript", 1)
                    break;
                case "csharp": 
                    langList.splice("csharp", 1)
                    break;
                case "java": 
                    langList.splice("java", 1)
                    break;
                case "python": 
                    langList.splice("python", 1)
                    break;
                case "php": 
                    langList.splice("php", 1)
                    break;
            
                default:
                    break;
            }
        }
    }

    const onChangeFrame = (e) => {
        frameCheck = e.target;
        console.log(frameCheck.checked)
        if(frameCheck.checked) {
            setFrameCheck(frameList.push(e.target.name));
        }  else if(frameCheck.checked === false) {
            switch (e.target.name) {
                case "angular": 
                    langList.splice("angular", 1)
                    break;
                case "react": 
                    langList.splice("react", 1)
                    break;
                case "dotnet": 
                    langList.splice("dotnet", 1)
                    break;
                case "laravel": 
                    langList.splice("laravel", 1)
                    break;
                case "django": 
                    langList.splice("django", 1)
                    break;
            
                default:
                    break;
            }
        }
    }

    const onType = (e) => {
        setRegion(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!langCheck) { 
            props.showAlert('Välj minst ett programmeringspråk');
        } else if (region && !tatOrter.includes(region)) {
            props.showAlert(`${region} är inte en av Sveriges 20 största städer. Eller så är det misstavat.`);
            history.replace('/')
        } else if (!props.profiles) {
            props.showAlert('Det fanns inga profiler baserat på dina val')
            setTimeout(() => window.location.reload(), 3000);
            
            // history.goBack()
        } 
        else {
            props.searchRegion(langList.join('+'), frameList.join('+'), region);
            history.push('/profiles')
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="choiceChange">
                <LangSearch onChangeLang={onChangeLang} />
                <FrameSearch onChangeFrame={onChangeFrame} />
                </div>
                <div>
                <TextSearch onType={onType} />
                </div>
            </form>
        </div>
    )
}

export default Search

