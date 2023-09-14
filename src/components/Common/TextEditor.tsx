import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from '@/configs';
import cn from 'classnames';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
];

interface OnChangeHandler {
    (e: any): void;
}

type Props = {
    value?: string;
    placeholder?: string;
    label?: string;
    labelClassname?: string;
    showError?: boolean;
    error?: string;
    errorClassname?: string;
    onChange?: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({
    error,
    errorClassname,
    label,
    labelClassname,
    value,
    showError,
    onChange,
    placeholder,
}) => {
    return (
        <>
            {label && <p className={cn('pb-2')}>{label}</p>}
            <ReactQuill
                theme="snow"
                value={'ạdhkjsadhksaj'}
                modules={{
                    toolbar: toolbarOptions,
                }}
                className="border-10"
                // formats={formats}
                // onChange={onChange}
                placeholder={placeholder}
            />
            {showError && <p className="text-sm text-common-error">asdasdas</p>}
        </>
    );
};

export default TextEditor;
