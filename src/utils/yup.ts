import * as yup from 'yup';
import parsePhoneNumber from 'libphonenumber-js';

const { object, string, mixed } = yup;

export const validationSchema = object({
    name: string().required('Это обязательное поле'),
    phone: string()
        .required('Это обязательное поле')
        .test('valid', 'Неверный номер', (phone) =>
            parsePhoneNumber(phone)?.isValid()
        ),
    description: string(),

    image: mixed<FileList>()
        .test('fileLength', 'Вы можете прикрепить не более 5 фото', (files) => {
            if (files) return files.length <= 5;
            return true;
        })
        .test(
            'fileSize',
            'Размер каждого изображения не должен превышать 10 МБ',
            (files) => {
                if (files) {
                     
                    for (const file of files) {
                        if (file.size >= 1e7) return false;
                    }
                }
                return true;
            }
        )
        .test(
            'extension',
            'Фото должно быть в PNG или JPEG формате',
            (files) => {
                if (files) {
                     
                    for (const file of files) {
                        if (
                            !(
                                file.type === 'image/png' ||
                                file.type === 'image/jpeg'
                            )
                        )
                            return false;
                    }
                }
                return true;
            }
        ),
});
