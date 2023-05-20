class Validator{
    static isEmpty(word: string): boolean {
        // 入力値が空でないとき
        if (word) {
            return false;
        }
        // 入力値が空のとき
        return true;
    }

    static isNumber(num: string): boolean {
        return false
    }

    static isPositive(num: string): boolean {
        const re: RegExp = /-?[1-9][0-9]*/
        
        if (!re.test(num)) {
            return false
        }
        return false
    }

    static isInteger(num: string): boolean {
        const re: RegExp = /-?[1-9][0-9]*/
        return re.test(num)
    }
}