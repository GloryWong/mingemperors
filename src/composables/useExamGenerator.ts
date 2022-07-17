import emperors from '@/data/emperors.json';

const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomEmperor = () => {
    const randomIndex = getRandom(0, emperors.length);
    return {
        info: emperors[randomIndex],
        index: randomIndex
    };
}

type Emperor = ReturnType<typeof getRandomEmperor>;

const getRandomUniqueEmperors = (count: number) => {
    const randomEmperors: Emperor[] = [];
    for (let i = 0; i < count; i++) {
        const randomEmperor = getRandomEmperor();
        if (randomEmperors.find(emperor => emperor.index === randomEmperor.index)) {
            i--;
        } else {
            randomEmperors.push(randomEmperor);
        }
    }
    return randomEmperors;
}

const getRandomTargetAndAsk = (planTypes: PlanType[]) => {
    const targetAndAsk: PlanType[] = [];
    for (let i = 0; i < planTypes.length; i++) {
        const randomEmperor = planTypes[getRandom(0, planTypes.length)];
        if (targetAndAsk.find(v => v === randomEmperor)) {
            i--;
        } else {
            targetAndAsk.push(randomEmperor);
        }
    }
    return {
        target: targetAndAsk[0],
        ask: targetAndAsk[1]
    };
}
type TargetAndAsk = ReturnType<typeof getRandomTargetAndAsk>;

const createQuestion = (emperorInfo: Emperor['info'], { target, ask }: TargetAndAsk) => {
    const [emperorName, eraName, templeName] = emperorInfo;

    let title = '';
    switch (target) {
        case 'EMPEROR_NAME':
            title = `${emperorName}`;
            break;
        case 'ERA_NAME':
            title = `${eraName}皇帝`;
            break;
        case 'TEMPLE_NAME':
            title = `${templeName}`;
            break;
    }

    let subtitle = '';
    let answer = '';
    switch (ask) {
        case 'EMPEROR_NAME':
            subtitle = '名字';
            answer = emperorName;
            break;
        case 'ERA_NAME':
            subtitle = '年号';
            answer = eraName;
            break;
        case 'TEMPLE_NAME':
            subtitle = '庙号';
            answer = templeName;
            break;
    }

    return {
        title,
        subtitle,
        answer,
        emperorName,
    };
}

export type Question = ReturnType<typeof createQuestion>;

const createChoices = (emperorInfos: Emperor['info'][], ask: TargetAndAsk['ask']) => {
    const choices: string[] = [];
    for (let i = 0; i < emperorInfos.length; i++) {
        const emperorInfo = emperorInfos[i];
        switch (ask) {
            case 'EMPEROR_NAME':
                choices.push(emperorInfo[0]);
                break;
            case 'ERA_NAME':
                choices.push(emperorInfo[1]);
                break;
            case 'TEMPLE_NAME':
                choices.push(emperorInfo[2]);
                break;
            }
        }
    return choices;
}

export type Choices = ReturnType<typeof createChoices>;

type PlanType = 'EMPEROR_NAME' | 'ERA_NAME' | 'TEMPLE_NAME';
const PLAN_TYPES: PlanType[] = ['EMPEROR_NAME', 'ERA_NAME', 'TEMPLE_NAME'];
const CHOICES_NUMBER = 4;

export function useExamGenerator() {
    return function generate() {
        const emperors = getRandomUniqueEmperors(CHOICES_NUMBER);
        const randomIndex = getRandom(0, emperors.length);
        const targetAndAsk = getRandomTargetAndAsk(PLAN_TYPES);

        const question = createQuestion(emperors[randomIndex].info, targetAndAsk);
        const choices = createChoices(emperors.map(emperor => emperor.info), targetAndAsk.ask);

        
        return {
            question,
            choices,
        };
    }
}