import { SampleNewsItem } from './types';

export const SAMPLE_NEWS_ITEMS: SampleNewsItem[] = [
  {
    id: 'sample-1',
    title: 'James Webb Space Telescope Discovery (Real)',
    category: 'Breaking News',
    type: 'headline',
    headline: 'NASA James Webb Space Telescope reveals detailed infrared images of ancient spiral galaxies formed 13 billion years ago.',
    content: 'Astronomers utilizing NASA’s James Webb Space Telescope have published peer-reviewed findings in Nature detailing high-resolution infrared observations of distant spiral galaxies. The observations provide new empirical constraints on early cosmic structure formation and star formation rates.',
    expectedVerdict: 'LIKELY REAL / SUPPORTED',
    description: 'A genuine scientific discovery reported by international research institutes with verifiable peer-reviewed citations.'
  },
  {
    id: 'sample-2',
    title: 'Lemon Peel 48-Hour Cancer Cure (Fake Hoax)',
    category: 'Viral Hoax',
    type: 'headline',
    headline: 'SHOCKING DOCTORS CONSPIRACY: Drinking boiled lemon peel tea completely eradicates stage 4 cancer in 48 hours with zero chemotherapy!',
    content: 'Doctors and big pharma are terrified you will learn this secret! An ancient organic tea recipe made from boiled lemon peel and baking soda will destroy 100% of cancer cells in 48 hours without expensive drugs or hospital visits. Share this everywhere before the authorities take it down!',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'A classic viral medical hoax with heavy clickbait tropes, debunked by oncology organizations and medical fact-checkers.'
  },
  {
    id: 'sample-3',
    title: '₹50,000 Direct Cash Handout Scheme (Fake Hoax)',
    category: 'Viral Hoax',
    type: 'headline',
    headline: 'Prime Minister Narendra Modi announces ₹50,000 direct bank transfer to every citizen account starting tomorrow morning.',
    content: 'In a special address, the central government announced a massive economic relief scheme providing 50,000 rupees direct cash grant to all bank account holders. Citizens are instructed to click the link below and submit bank credentials to claim immediate credit.',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'A viral scam hoax promising false government cash handouts. No official gazette or news agency corroborated this claim.'
  },
  {
    id: 'sample-4',
    title: 'India T20 World Cup 2024 Victory (Real)',
    category: 'Breaking News',
    type: 'headline',
    headline: 'India won the ICC Men’s T20 World Cup 2024 championship against South Africa in Barbados.',
    content: 'India ended their 11-year ICC trophy drought by defeating South Africa by 7 runs in a thrilling final at the Kensington Oval in Bridgetown, Barbados. Virat Kohli was named player of the match.',
    expectedVerdict: 'LIKELY REAL / SUPPORTED',
    description: 'Major international sports event corroborated by international media, ICC, and global broadcast records.'
  },
  {
    id: 'sample-te-1',
    title: 'నిమ్మకాయ రసంతో క్యాన్సర్ మాయం (Telugu Fake Hoax)',
    category: 'Viral Hoax',
    type: 'headline',
    headline: 'షాకింగ్: ఉదయాన్నే వేడి నీళ్లలో నిమ్మకాయ రసం కలిపి తాగితే 48 గంటల్లో క్యాన్సర్ పూర్తిగా నయమవుతుంది! డాక్టర్లు దాస్తున్న రహస్యం వెంటనే షేర్ చేయండి!',
    content: 'డాక్టర్లు మరియు మందుల కంపెనీలు దాస్తున్న అసలైన రహస్యం బయటపడింది. రోజూ నిమ్మకాయ రసం తాగితే ఎలాంటి క్యాన్సర్ అయినా 48 గంటల్లో నయం అవుతుంది. ఈ సందేశాన్ని అందరికీ షేర్ చేయండి!',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'తెలుగులో వైరల్ అవుతున్న నకిలీ వైద్య సమాచారం - మెడికల్ కౌన్సిల్ మరియు ఆంకాలజీ నిపుణులచే ఖండించబడింది.'
  },
  {
    id: 'sample-te-2',
    title: 'ఇస్రో చంద్రయాన్-3 మిషన్ విజయం (Telugu Real News)',
    category: 'Breaking News',
    type: 'headline',
    headline: 'ఇస్రో చంద్రయాన్-3 మిషన్ చంద్రుడి దక్షిణ ధ్రువంపై విజయవంతంగా ల్యాండ్ అయిందని అధికారికంగా ప్రకటించింది.',
    content: 'భారత అంతరిక్ష పరిశోధనా సంస్థ ఇస్రో ప్రయోగించిన చంద్రయాన్-3 ల్యాండర్ మాడ్యూల్ చంద్రుడి దక్షిణ ధ్రువంపై విజయవంతంగా దిగినట్లు ఇస్రో శాస్త్రవేత్తలు ప్రకటించారు. ఈ ఘనత సాధించిన తొలి దేశంగా భారత్ నిలిచింది.',
    expectedVerdict: 'LIKELY REAL / SUPPORTED',
    description: 'ఇస్రో అధికారికంగా ధృవీకరించిన వాస్తవ చారిత్రక సైన్స్ వార్త.'
  },
  {
    id: 'sample-te-3',
    title: 'అర్ధరాత్రి నుంచి 2000 నోట్ల రద్దు రూల్స్ (Telugu Fake Hoax)',
    category: 'Viral Hoax',
    type: 'headline',
    headline: 'ఈ రాత్రి 12 గంటల నుంచి 2000 రూపాయల నోట్లు పూర్తిగా రద్దు, ఆర్బీఐ సరికొత్త కఠిన నిబంధనలు జారీ చేసింది.',
    content: 'కేంద్ర ప్రభుత్వం మరియు ఆర్బీఐ అత్యవసర ప్రకటన చేశాయి. ఈ అర్ధరాత్రి నుంచి 2000 నోట్లు చెల్లవు, ఎవరైనా కలిగి ఉంటే జరిమానా విధిస్తారు అని వాట్సాప్‌లో వ్యాపిస్తున్న సమాచారం.',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'సామాజిక మాధ్యమాల్లో తప్పుడు ప్రచారం చేయబడుతున్న నకిలీ నోట్ల రద్దు హెచ్చరిక.'
  },
  {
    id: 'sample-5',
    title: 'Free Laptop for Students Scheme (Phishing Fake)',
    category: 'Viral Hoax',
    type: 'headline',
    headline: 'Education Ministry announced free laptops and tablets to all college students who register before this Sunday.',
    content: 'Under the National Digital Education Empowerment program, every university and college student is eligible for a free HP/Dell laptop. Register with your Aadhaar and bank details immediately on the link to receive doorstep courier delivery.',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'Debunked by PIB Fact Check (Press Information Bureau) as a recurring phishing scam targeting students.'
  },
  {
    id: 'sample-6',
    title: 'Elon Musk Purchased Royal Palace (Synthetic Fake)',
    category: 'Debunked Claim',
    type: 'headline',
    headline: 'Elon Musk has finalized the purchase of the British Royal Family Buckingham Palace for $50 billion.',
    content: 'Tech billionaire Elon Musk signed historic acquisition documents to purchase Buckingham Palace for 50 billion USD, announcing plans to convert royal chambers into an artificial intelligence lab.',
    expectedVerdict: 'LIKELY FAKE / CONTRADICTED',
    description: 'ChatGPT synthetic fabrication with zero coverage in accredited royal or international news agencies.'
  }
];
