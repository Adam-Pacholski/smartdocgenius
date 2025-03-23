
export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date';
  required?: boolean;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  fields: TemplateField[];
  template: (data: Record<string, string>) => string;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: DocumentTemplate[];
}

// Common fields for cover letters
const commonCoverLetterFields: TemplateField[] = [
  { id: 'fullName', label: 'Imię i nazwisko', placeholder: 'Jan Kowalski', type: 'text', required: true },
  { id: 'email', label: 'Email', placeholder: 'jan.kowalski@example.com', type: 'text', required: true },
  { id: 'phone', label: 'Telefon', placeholder: '+48 123 456 789', type: 'text', required: true },
  { id: 'address', label: 'Adres', placeholder: 'ul. Przykładowa 1, 00-001 Warszawa', type: 'text' },
  { id: 'city', label: 'Miasto', placeholder: 'Warszawa', type: 'text', required: true },
  { id: 'date', label: 'Data', placeholder: '01.01.2023', type: 'date', required: true },
  { id: 'recipientName', label: 'Nazwa firmy', placeholder: 'Nazwa Firmy Sp. z o.o.', type: 'text', required: true },
  { id: 'recipientAddress', label: 'Adres firmy', placeholder: 'ul. Biznesowa 5, 00-001 Warszawa', type: 'text' },
  { id: 'position', label: 'Stanowisko', placeholder: 'Specjalista ds. marketingu', type: 'text', required: true },
  { id: 'subject', label: 'Temat', placeholder: 'Aplikacja na stanowisko Specjalisty ds. marketingu', type: 'text', required: true },
  { id: 'opening', label: 'Otwarcie', placeholder: 'Szanowni Państwo,', type: 'text', required: true },
  { id: 'body', label: 'Treść', placeholder: 'Z zainteresowaniem przeczytałem/am Państwa ogłoszenie o pracę...', type: 'textarea', required: true },
  { id: 'closing', label: 'Zakończenie', placeholder: 'Z wyrazami szacunku,', type: 'text', required: true },
];

const documentTypes: DocumentType[] = [
  {
    id: 'cover-letter',
    name: 'List motywacyjny',
    description: 'Profesjonalny list motywacyjny, który pomoże Ci zdobyć wymarzoną pracę',
    icon: 'file-text',
    templates: [
      {
        id: 'classic',
        name: 'Klasyczny',
        description: 'Formalny, tradycyjny układ odpowiedni dla większości branż',
        thumbnail: 'classic-cover-letter.png',
        fields: commonCoverLetterFields,
        template: (data) => `
          <div class="p-8 max-w-[21cm] mx-auto bg-white text-black">
            <div class="flex flex-col space-y-4">
              <div class="self-end">
                <p>${data.fullName}</p>
                <p>${data.email}</p>
                <p>${data.phone}</p>
                <p>${data.address}</p>
                <p>${data.city}</p>
                <p>${data.date}</p>
              </div>
              
              <div class="mt-8">
                <p>${data.recipientName}</p>
                <p>${data.recipientAddress}</p>
              </div>
              
              <div class="mt-8">
                <p class="font-bold">Dotyczy: ${data.subject}</p>
              </div>
              
              <div class="mt-4">
                <p>${data.opening}</p>
              </div>
              
              <div class="mt-4 whitespace-pre-line">
                ${data.body}
              </div>
              
              <div class="mt-8">
                <p>${data.closing}</p>
                <p class="mt-8">${data.fullName}</p>
              </div>
            </div>
          </div>
        `,
      },
      {
        id: 'modern',
        name: 'Nowoczesny',
        description: 'Świeży, współczesny wygląd z akcentami kolorystycznymi',
        thumbnail: 'modern-cover-letter.png',
        fields: commonCoverLetterFields,
        template: (data) => `
          <div class="p-8 max-w-[21cm] mx-auto bg-white text-black">
            <div class="border-l-4 border-gray-800 pl-6 mb-8">
              <h1 class="text-2xl font-bold mb-1">${data.fullName}</h1>
              <p class="text-gray-600">${data.email} | ${data.phone}</p>
            </div>
            
            <div class="flex justify-between items-start mb-8">
              <div>
                <p class="font-medium">${data.date}</p>
              </div>
              <div class="text-right">
                <p class="font-medium">${data.recipientName}</p>
                <p>${data.recipientAddress}</p>
              </div>
            </div>
            
            <div class="mb-6">
              <h2 class="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wider">
                ${data.subject}
              </h2>
            </div>
            
            <div class="mb-4">
              <p>${data.opening}</p>
            </div>
            
            <div class="whitespace-pre-line mb-6">
              ${data.body}
            </div>
            
            <div>
              <p class="mb-8">${data.closing}</p>
              <p class="font-medium">${data.fullName}</p>
            </div>
          </div>
        `,
      },
      {
        id: 'creative',
        name: 'Kreatywny',
        description: 'Oryginalny układ idealny dla branż kreatywnych',
        thumbnail: 'creative-cover-letter.png',
        fields: commonCoverLetterFields,
        template: (data) => `
          <div class="p-8 max-w-[21cm] mx-auto bg-white">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg">
                <h1 class="text-xl font-bold mb-4">${data.fullName}</h1>
                <div class="space-y-2 text-sm">
                  <p>${data.email}</p>
                  <p>${data.phone}</p>
                  <p>${data.address}</p>
                  <p>${data.city}</p>
                  <p class="pt-4">${data.date}</p>
                </div>
              </div>
              
              <div class="w-full md:w-2/3">
                <div class="mb-6">
                  <p class="font-medium">${data.recipientName}</p>
                  <p>${data.recipientAddress}</p>
                </div>
                
                <h2 class="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
                  ${data.subject}
                </h2>
                
                <div class="mb-4">
                  <p>${data.opening}</p>
                </div>
                
                <div class="whitespace-pre-line mb-6">
                  ${data.body}
                </div>
                
                <div>
                  <p class="mb-6">${data.closing}</p>
                  <p class="font-medium">${data.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
    ],
  },
];

export default documentTypes;
