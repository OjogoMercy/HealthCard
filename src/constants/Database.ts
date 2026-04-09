export interface Vaccine {
  title: string;
  status: "Completed" | "Pending";

  data: VaccineDetail[];
}
export interface VaccineDetail {
  id: string;
  name: string;
  isDone: boolean;
  summary: string;
  preChecklist: string[];
  sideEffects: string[];
  warningSigns: string[];
}

export const VaccineData = [
  {
    title: "Birth",
    status: "Completed",
    data: [
      {
        id: "1",
        name: "BCG",
        isDone: true,
        summary:
          "This vaccine protects your baby from a dangerous infection called tuberculosis (TB). TB can attack the lungs and, in babies, can also spread to the brain, which can be life-threatening. Getting this vaccine at birth gives your baby strong early protection.",
        preChecklist: [
          "Let the nurse or doctor know if your baby was born early (premature) or has any health conditions.",
          "Make sure your baby has been feeding well and is not unwell on the day of the visit.",
          "Carry your baby's health card or immunization booklet to every appointment.",
        ],
        sideEffects: [
          "A small red bump may appear at the injection site (usually the upper left arm) a few weeks after the shot — this is normal.",
          "The bump may turn into a small blister and then a tiny scar, this is expected and means the vaccine worked.",
          "Mild swelling or tenderness around the injection area.",
        ],
        warningSigns: [
          "If the injection site becomes very large, very swollen, or starts draining pus, contact your doctor.",
          "If your baby develops a high fever (above 38.5°C) that does not go down, seek medical attention.",
          "If your baby seems unusually weak or refuses to feed for more than a few hours, see a doctor.",
        ],
      },
      {
        id: "2",
        name: "OPV 0",
        isDone: true,
        summary:
          "This is the first dose of the polio vaccine, given as drops in the mouth at birth. Polio is a virus that can cause permanent paralysis, meaning a child may never be able to walk again. This early dose begins protecting your baby right away.",
        preChecklist: [
          "No special preparation is needed for this vaccine.",
          "If your baby has been vomiting or has severe diarrhoea on the day, let the health worker know, the dose may need to be repeated.",
          "Bring your immunization card so the dose is properly recorded.",
        ],
        sideEffects: [
          "This vaccine is given as oral drops, so injection-site reactions do not apply.",
          "Some babies may have mild loose stool after the drops, this usually passes quickly.",
        ],
        warningSigns: [
          "If your baby vomits immediately after receiving the drops, let the health worker know so they can give another dose.",
          "If you notice any unusual weakness in your baby's arms or legs, contact a doctor promptly.",
        ],
      },
      {
        id: "3",
        name: "Hep B0 (Birth)",
        isDone: true,
        summary:
          "This vaccine protects your baby against Hepatitis B, a serious infection that attacks the liver. Babies who get Hepatitis B at birth are at high risk of carrying the virus for life, which can lead to liver disease or liver cancer later on. This birth dose is extremely important.",
        preChecklist: [
          "This vaccine is ideally given within 24 hours of birth, so inform the hospital staff as early as possible.",
          "Let the medical team know your own Hepatitis B status if you know it, this helps them decide if extra treatment is needed for your baby.",
        ],
        sideEffects: [
          "Mild soreness or swelling at the injection site.",
          "Low-grade fever in some babies.",
          "Your baby may be fussier than usual for a day or two.",
        ],
        warningSigns: [
          "A high fever (above 38.5°C) that does not reduce with paracetamol syrup should be reported to a doctor.",
          "If the injection site becomes very swollen, red, or hot to touch after 48 hours, seek medical attention.",
        ],
      },
    ],
  },
  {
    title: "6 Weeks",
    status: "Completed",
    data: [
      {
        id: "4",
        name: "Pentavalent 1 (DPT, Hep B, Hib)",
        isDone: false,
        summary:
          "This is one injection that protects your baby against five diseases at once: diphtheria (a throat infection that can block breathing), whooping cough (a severe cough that can stop a baby from breathing), tetanus (a dangerous infection from wounds), Hepatitis B (liver infection), and Hib (a bacteria that can cause meningitis and pneumonia). It is given at 6 weeks.",
        preChecklist: [
          "Feed your baby before the appointment, a full baby is usually calmer during injections.",
          "Do not give this vaccine if your baby has a high fever on the day, reschedule and let the health worker know.",
          "Bring something to comfort your baby after the shot, like a small toy or a cloth with your scent.",
        ],
        sideEffects: [
          "Pain, redness, or swelling at the injection site for 1–2 days.",
          "Mild to moderate fever, usually within 24 hours of the shot.",
          "Your baby may cry more than usual and be clingy, this is normal.",
          "Slight loss of appetite on the day of vaccination.",
        ],
        warningSigns: [
          "A very high fever (above 39°C) or a fever that lasts more than 2 days after vaccination needs medical attention.",
          "If your baby has a convulsion (body shaking or jerking), go to the hospital immediately.",
          "If the injection site is still very swollen, warm, or hard after 3 days, see a doctor.",
          "If your baby is unusually difficult to wake up or is not responding normally, seek help right away.",
        ],
      },
      {
        id: "5",
        name: "Pneumococcal Conjugate Vaccine 1 (PCV 1)",
        isDone: false,
        summary:
          "This vaccine protects your baby from pneumococcal bacteria, which are a common cause of pneumonia (a lung infection), meningitis (an infection around the brain), and ear infections. Pneumonia is one of the leading killers of young children in Nigeria. This vaccine greatly reduces that risk.",
        preChecklist: [
          "Feed your baby before the appointment to help keep them calm.",
          "Dress your baby in clothing that makes the upper thigh or arm easy to access.",
          "Let the nurse know if your baby has had any allergic reactions to previous vaccines.",
        ],
        sideEffects: [
          "Soreness, redness, or a small lump at the injection site.",
          "Mild fever within 24 hours of vaccination.",
          "Fussiness or irritability for a day or two.",
        ],
        warningSigns: [
          "If your baby develops a stiff neck, extreme sensitivity to light, or a rash alongside a fever, go to the hospital immediately, these can be signs of meningitis.",
          "A fever above 39°C that does not come down should be seen by a doctor.",
        ],
      },
      {
        id: "6",
        name: "OPV 1",
        isDone: false,
        summary:
          "This is the second dose of the oral polio vaccine, given at 6 weeks. Each dose builds on the last, strengthening your baby's protection against polio. It is important not to skip or delay this dose.",
        preChecklist: [
          "Make sure your baby has not had severe diarrhoea or vomiting in the 24 hours before the appointment.",
          "Bring your immunization card to confirm the first dose was recorded.",
        ],
        sideEffects: [
          "No injection is involved, so no site reactions expected.",
          "Mild loose stool may occur temporarily.",
        ],
        warningSigns: [
          "If your baby vomits right after receiving the drops, inform the health worker immediately for a repeat dose.",
          "Unusual weakness or limpness in any limb should be reported to a doctor without delay.",
        ],
      },
      {
        id: "7",
        name: "Rota 1",
        isDone: false,
        summary:
          "This vaccine protects against rotavirus, the most common cause of severe diarrhoea and dehydration in babies and young children. Rotavirus diarrhoea can cause a baby to lose so much fluid so quickly that it becomes life-threatening. This vaccine is given as drops in the mouth.",
        preChecklist: [
          "If your baby has had a stomach illness or diarrhoea in the past 2 weeks, let the health worker know before the dose is given.",
          "Do not withhold feeding, breastfeeding before and after is encouraged.",
        ],
        sideEffects: [
          "Mild stomach upset or loose stool for a day or two.",
          "Occasional mild vomiting after the drops.",
          "Slight fussiness.",
        ],
        warningSigns: [
          "Severe diarrhoea with blood in the stool should be reported to a doctor immediately.",
          "If your baby's stomach appears very bloated or they are in obvious pain, seek care promptly.",
        ],
      },
    ],
  },
  {
    title: "10 Weeks",
    status: "Completed",
    data: [
      {
        id: "8",
        name: "IPV 1",
        isDone: false,
        summary:
          "IPV stands for Inactivated Polio Vaccine. Unlike the oral drops, this is an injection that provides a stronger, longer-lasting boost of protection against polio. It works together with the oral drops your baby has already received.",
        preChecklist: [
          "Feed your baby before the visit.",
          "Let the health worker know if your baby is on any medication or has been unwell recently.",
        ],
        sideEffects: [
          "Mild soreness or redness at the injection site.",
          "Low-grade fever.",
          "Mild fussiness for a day.",
        ],
        warningSigns: [
          "Any noticeable weakness or floppiness in the arms or legs after vaccination should be reported to a doctor immediately.",
          "A fever above 39°C that does not settle should be seen by a health worker.",
        ],
      },
      {
        id: "9",
        name: "Pentavalent 2 (DPT, Hep B, Hib)",
        isDone: false,
        summary:
          "This is the second dose of the five-in-one vaccine protecting against diphtheria, whooping cough, tetanus, Hepatitis B, and Hib. Each dose is essential, skipping it leaves your baby partially protected. It is given at 10 weeks.",
        preChecklist: [
          "Feed your baby before the appointment.",
          "Reschedule if your baby has a fever above 38.5°C on the day.",
          "Let the nurse know how your baby reacted to the first Pentavalent dose.",
        ],
        sideEffects: [
          "Pain, redness, or swelling at the injection site.",
          "Fever within 24 hours, a cool, damp cloth on the forehead can help.",
          "Increased crying or clinginess.",
        ],
        warningSigns: [
          "A very high fever (above 39°C) lasting more than 48 hours needs medical attention.",
          "Any convulsions or seizures, go to the hospital immediately.",
          "Swelling that spreads beyond the injection site should be checked by a doctor.",
        ],
      },
      {
        id: "10",
        name: "Pneumococcal Conjugate Vaccine 2 (PCV 2)",
        isDone: false,
        summary:
          "The second dose of the pneumonia and meningitis vaccine. Two doses are needed to build a strong enough defence in young babies. Given at 10 weeks.",
        preChecklist: [
          "No fever on the day of vaccination.",
          "Feed your baby beforehand.",
          "Inform the nurse of any reaction to the first PCV dose.",
        ],
        sideEffects: [
          "Soreness or mild swelling at the injection site.",
          "Low-grade fever.",
          "Fussiness for 1–2 days.",
        ],
        warningSigns: [
          "Stiff neck, unusual sensitivity to light, or a widespread rash alongside fever, go to the hospital right away.",
          "Fever above 39°C that is not responding to paracetamol should be reported.",
        ],
      },
      {
        id: "11",
        name: "OPV 2",
        isDone: false,
        summary:
          "The third dose of the oral polio vaccine, given at 10 weeks. Consistency with each dose is what builds full protection. Nigeria has worked hard to eliminate polio, completing this schedule helps protect not just your baby, but all children.",
        preChecklist: [
          "Avoid giving this dose if your baby has severe diarrhoea or has been vomiting on that day.",
          "Bring your immunization card.",
        ],
        sideEffects: [
          "Generally very well tolerated.",
          "Occasional mild loose stool.",
        ],
        warningSigns: [
          "Vomiting immediately after the dose, inform the health worker so the dose can be repeated.",
          "Any new weakness or floppiness in a limb should be reported to a doctor.",
        ],
      },
      {
        id: "12",
        name: "Rota 2",
        isDone: false,
        summary:
          "The second and final dose of the rotavirus vaccine, given at 10 weeks. This completes your baby's protection against the virus that causes the most severe diarrhoea in young children.",
        preChecklist: [
          "Inform the health worker if your baby had any stomach problems after the first Rota dose.",
          "If your baby has had diarrhoea recently, let the nurse know.",
        ],
        sideEffects: [
          "Mild stomach discomfort.",
          "Loose stools for a day or two.",
        ],
        warningSigns: [
          "Blood in the stool after vaccination, seek care immediately.",
          "A very bloated or hard belly, or your baby pulling their legs up in pain, these could be signs of a rare bowel complication and require urgent medical attention.",
        ],
      },
    ],
  },
  {
    title: "14 Weeks",
    status: "Completed",
    data: [
      {
        id: "13",
        name: "Pentavalent 3 (DPT, Hep B, Hib)",
        isDone: false,
        summary:
          "The third and final dose of the five-in-one vaccine, given at 14 weeks. Completing all three doses ensures your baby has full, lasting protection against diphtheria, whooping cough, tetanus, Hepatitis B, and Hib disease.",
        preChecklist: [
          "Feed your baby before the appointment.",
          "Do not give the vaccine if your baby has a fever that day.",
          "Share any previous reactions to earlier doses with the nurse.",
        ],
        sideEffects: [
          "Soreness, redness, or swelling at the injection site.",
          "Fever within 24 hours.",
          "Your baby may be unsettled for 1–2 days.",
        ],
        warningSigns: [
          "Fever above 39°C lasting more than 2 days, see a doctor.",
          "Convulsions or jerking movements, go to the hospital immediately.",
          "Extreme paleness, difficulty breathing, or your baby becoming limp, seek emergency care.",
        ],
      },
      {
        id: "14",
        name: "Pneumococcal Conjugate Vaccine 3 (PCV 3)",
        isDone: false,
        summary:
          "The third and final dose of the PCV vaccine, given at 14 weeks. After three doses, your baby will have strong, lasting protection against the bacteria that cause pneumonia, meningitis, and serious ear infections.",
        preChecklist: [
          "Your baby should be healthy on the day of vaccination.",
          "Feed your baby beforehand.",
          "Bring the immunization card.",
        ],
        sideEffects: [
          "Mild pain or swelling at injection site.",
          "Low fever.",
          "Irritability for a short time.",
        ],
        warningSigns: [
          "Signs of meningitis, stiff neck, high fever, sensitivity to light, unusual drowsiness, go to the hospital immediately.",
          "Difficulty breathing after vaccination needs urgent attention.",
        ],
      },
      {
        id: "15",
        name: "OPV 3",
        isDone: false,
        summary:
          "The fourth dose of the oral polio vaccine, completing the series started at birth. Finishing all the polio doses gives your baby the strongest possible protection against paralysis caused by the polio virus.",
        preChecklist: [
          "No diarrhoea or vomiting on the day of the visit.",
          "Bring the immunization card.",
        ],
        sideEffects: [
          "Very few side effects, the drops are generally well tolerated.",
          "Mild stomach upset in some babies.",
        ],
        warningSigns: [
          "Immediate vomiting after the drops, report to the health worker for a repeat dose.",
          "Any unexplained weakness in the legs or arms should be seen by a doctor urgently.",
        ],
      },
      {
        id: "16",
        name: "Rota 3",
        isDone: true,
        summary:
          "Rotavirus is a virus that causes severe, watery diarrhea and vomiting in infants, which can quickly lead to life-threatening dehydration. This final early dose completes the primary series to ensure the baby's immune system is fully primed to fight off the infection during the most vulnerable first year of life.",
        preChecklist: [
          "Ensure the baby has not had a dirty diaper with loose or watery stools in the last 24 hours",
          "Do not feed the baby a large meal immediately before the appointment to prevent spitting up the oral drops",
          "Keep the immunization card ready for the health worker to record this final dose",
        ],
        sideEffects: [
          "Mild fussiness or irritability shortly after taking the drops",
          "Temporary loss of appetite for the next feeding",
          "A slight increase in stool frequency for 1–2 days",
        ],
        warningSigns: [
          "Signs of severe dehydration: the soft spot on the baby's head (fontanelle) appearing sunken, no wet diapers for over 6 hours, or crying without tears",
          "Intussusception: the baby pulling their knees to their chest and crying inconsolably in waves, which could indicate a rare bowel issue",
          "High fever: a body temperature reading above 39°C that does not come down with prescribed paracetamol",
          "Blood or mucus appearing in the baby's stool",
        ],
      },
      {
        id: "17",
        name: "IPV 2",
        isDone: false,
        summary:
          "The second dose of the injected polio vaccine, given at 14 weeks. Together with the oral drops, this injectable dose locks in full protection against all types of the polio virus.",
        preChecklist: [
          "Your baby should be well and not feverish on the day.",
          "Feed your baby before the appointment.",
        ],
        sideEffects: [
          "Mild soreness or redness at injection site.",
          "Low-grade fever.",
          "Mild fussiness.",
        ],
        warningSigns: [
          "Weakness or unusual floppiness in any limb, see a doctor immediately.",
          "A high fever that does not settle within 48 hours.",
        ],
      },
    ],
  },
  {
    title: "6 Months",
    status: "Pending",
    data: [
      {
        id: "18",
        name: "Vitamin A (1st dose)",
        isDone: false,
        summary:
          "Vitamin A is not a vaccine against a specific disease, but it is a powerful supplement that strengthens your baby's immune system. Babies who receive Vitamin A are less likely to die from common childhood illnesses like diarrhoea, pneumonia, and measles. It is given at 6 months.",
        preChecklist: [
          "This is given as drops or a capsule by mouth — no injection is involved.",
          "Make sure your baby has not received Vitamin A from another source (like another health programme) in the past month.",
        ],
        sideEffects: [
          "Nausea or vomiting shortly after the dose in some children.",
          "Mild headache (in older children) or temporary fussiness in babies.",
          "These effects usually pass within 24 hours.",
        ],
        warningSigns: [
          "Persistent vomiting after the dose — contact a health worker.",
          "Swelling around the soft spot on the baby's head — seek medical attention promptly.",
        ],
      },
    ],
  },
  {
    title: "9 Months",
    status: "Pending",
    data: [
      {
        id: "19",
        name: "Measles (1st dose)",
        isDone: false,
        summary:
          "This vaccine protects your baby from measles, a highly contagious virus that causes fever, rash, and can lead to pneumonia, brain damage, or death in young children. The measles vaccine is one of the most important vaccines on this schedule. It is given at 9 months.",
        preChecklist: [
          "Your baby should not be unwell or feverish on the day.",
          "Let the nurse know if your baby has ever had a severe allergic reaction to any vaccine.",
          "If your baby received a blood transfusion recently, let the nurse know — it may affect the timing of this vaccine.",
        ],
        sideEffects: [
          "Mild fever 5–12 days after vaccination — this is normal and means the vaccine is working.",
          "A faint rash may appear around the same time as the mild fever — this is also normal.",
          "Slight swelling of the lymph nodes.",
        ],
        warningSigns: [
          "A high fever (above 39°C) or a rash that spreads widely and is accompanied by breathing difficulty — seek medical care immediately.",
          "If your baby has a febrile convulsion (shaking with fever) after this vaccine, contact a doctor even if the shaking stops — it needs to be evaluated.",
        ],
      },
      {
        id: "20",
        name: "Yellow Fever",
        isDone: false,
        summary:
          "Yellow fever is a serious infection spread by mosquito bites that can cause liver failure and death. Nigeria is a Yellow Fever-endemic country, meaning the virus is present here. This one-time vaccine gives lifelong protection and is given at 9 months.",
        preChecklist: [
          "Your baby must not have a fever or be unwell on the day.",
          "This vaccine is not recommended if your baby has a known immune system problem — discuss with the doctor first.",
          "Carry the immunization card as Yellow Fever vaccination is an international requirement for travel.",
        ],
        sideEffects: [
          "Mild fever, headache, or muscle aches 5–10 days after the shot.",
          "Soreness at the injection site.",
          "Mild fatigue for a day or two.",
        ],
        warningSigns: [
          "Signs of a severe allergic reaction — difficulty breathing, swelling of the face or lips, or your baby turning pale — seek emergency care immediately.",
          "Yellowing of the skin or eyes (jaundice) after vaccination should be reported to a doctor.",
        ],
      },
      {
        id: "21",
        name: "Meningitis Vaccine",
        isDone: false,
        summary:
          "This vaccine protects against meningococcal meningitis, a fast-moving infection that inflames the covering of the brain and spinal cord. It can kill within 24 hours or cause permanent deafness and brain damage in survivors. Nigeria is in what is called the 'meningitis belt,' making this vaccine especially important. It is given at 9 months.",
        preChecklist: [
          "Your baby should be healthy and fever-free on the day.",
          "Let the nurse know if your baby has any known immune system condition.",
        ],
        sideEffects: [
          "Soreness or swelling at the injection site.",
          "Mild fever within 24 hours.",
          "Fussiness or reduced appetite for 1–2 days.",
        ],
        warningSigns: [
          "Stiff neck, extreme sensitivity to light, a rash that looks like small red or purple spots that do not fade when pressed — go to the emergency room immediately. These are signs of meningitis.",
          "A high fever that does not come down after 48 hours should be seen by a doctor.",
        ],
      },
    ],
  },
  {
    title: "12 Months",
    status: "Pending",
    data: [
      {
        id: "22",
        name: "Vitamin A (2nd dose)",
        isDone: false,
        summary:
          "The second Vitamin A dose, given at 12 months, continues to protect your child's immune system and supports healthy eyesight. Regular Vitamin A supplementation is linked to fewer child deaths from preventable illnesses.",
        preChecklist: [
          "Confirm with the health worker that at least 4 months have passed since the first Vitamin A dose.",
          "No injection is involved — this is given by mouth.",
        ],
        sideEffects: [
          "Temporary nausea or vomiting in some children.",
          "Mild fussiness.",
        ],
        warningSigns: [
          "Persistent vomiting that continues hours after the dose — contact a health worker.",
          "Any unusual swelling around the soft spot on the baby's head — seek prompt medical attention.",
        ],
      },
    ],
  },
  {
    title: "15 Months",
    status: "Pending",
    data: [
      {
        id: "23",
        name: "Measles (2nd dose) / MCV2",
        isDone: false,
        summary:
          "The second dose of the measles vaccine is given at 15 months to ensure full, long-lasting protection. Not everyone builds complete immunity from the first dose alone, so this second dose closes that gap and protects your child for life.",
        preChecklist: [
          "Your child should be healthy and fever-free on the day.",
          "Confirm with the nurse that the first dose is recorded in the immunization card.",
        ],
        sideEffects: [
          "Mild fever 5–12 days after the shot.",
          "Faint rash that appears around the same time as the fever.",
          "Mild runny nose or red eyes for a short time.",
        ],
        warningSigns: [
          "High fever with difficulty breathing or a widespread rash — seek medical care right away.",
          "A febrile convulsion (shaking while feverish) should be evaluated by a doctor even if it stops on its own.",
        ],
      },
    ],
  },
  {
    title: "9–13 Years",
    status: "Pending",
    data: [
      {
        id: "24",
        name: "HPV (6 months interval, 2 doses)",
        isDone: false,
        summary:
          "The HPV vaccine protects against a virus called Human Papillomavirus, which is the main cause of cervical cancer in women. Cervical cancer kills thousands of Nigerian women every year, and this vaccine — given in two doses 6 months apart — can prevent it. It is recommended for girls from age 9 upward.",
        preChecklist: [
          "This vaccine is for girls. Confirm with your health worker if your daughter qualifies based on her age.",
          "Your daughter should be healthy and not feverish on the day.",
          "Let the nurse know if your daughter has any known allergies.",
          "Make sure to schedule and complete both doses — one dose alone does not provide full protection.",
        ],
        sideEffects: [
          "Pain, redness, or swelling at the injection site — this is very common and usually mild.",
          "Headache or tiredness.",
          "Low-grade fever.",
          "Some girls feel dizzy or faint shortly after — she should sit or lie down for 15 minutes after the shot.",
        ],
        warningSigns: [
          "Signs of a severe allergic reaction — difficulty breathing, swelling of the face or throat, rapid heartbeat — seek emergency care immediately.",
          "Fainting that does not resolve within a few minutes should be evaluated by a health worker.",
        ],
      },
    ],
  },
];
