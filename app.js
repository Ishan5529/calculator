function autoReFocus(){
    const inp = document.getElementById("input_box");
    inp.focus();
    checkReset();
    sizeCheck();
}

function autoFocus(){
    const inp = document.getElementById("input_box");
    inp.focus();
    inp.value = 0;
    checkReset();
}

function removeLeadZeros()
{
    const inp = document.getElementById("input_box");
    let val = inp.value;
    const opers = ['+', '-', '*', '/', '%', 's', 'c', 't', 'l', 'S', 'C', 'T', 'L', '^'];
    if (val.length == 2)
    {
        if (opers.includes(val[1]))
        {
            return;
        }
    }
    while (val.length > 0)
    {
        if (val[0] == 0)
        {
            val = val.slice(1);
        }
        else
        {
            inp.value = val;
            return;
        }
    }
    inp.value = 0;
}

function sizeCheck()
{
    inp = document.getElementById("input_box");
    if (inp.value.length <= 14)
        inp.style.fontSize = '2rem';
    else if (inp.value.length > 14 && inp.value.length <= 32)
        inp.style.fontSize = '1rem';
    else if (inp.value.length > 32)
        inp.style.fontSize = '0.8rem';
}

function checkLead()
{
    const inp = document.getElementById("input_box");
    const val = inp.value;
    const valid = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    if (!valid.includes(val[0]))
        inp.value = val.slice(1);
}
function numonly()
{
    checkReset();
    checkLead();

    const inp = document.getElementById("input_box");
    const disp = document.getElementById("exp_box");
    const val = inp.value;
    let new_val='';
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const opers = ['+', '-', '*', '/', '%', '^'];
    const sci = ['s', 'c', 't', 'l', , 'S', 'C', 'T', 'L'];
    let lenW_O_oper = 0;
    let i = val.length - 1;
    const valv = val.slice(0, i);

    sizeCheck();

    if (valv == 'NaN' || valv == '-Infinity' || valv == 'Infinity')
    {
        alert('Invalid Operation');
        inp.value = 0;
        checkReset();
        return;
    }
    removeLeadZeros();
    if (i == -1)
    {
        inp.value = 0;
        checkReset();
        return;
    }
    if (digits.includes(val[i]))
    {
        const dispVal = disp.value;
        if (dispVal[dispVal.length - 1] == ')')
        {
            inp.value = val.slice(0, i);
            checkReset();
            return;
        }
        checkReset();
        return;
    }

    else if (opers.includes(val[i]))
    {
        const dispVal = disp.value;
        if (dispVal[dispVal.length - 1] == ')')
        {
            disp.value += val[1];
            inp.value = 0;
            return;
        }
        newOperator();
        inp.value = 0;
        sizeCheck();
        checkReset();
        return;
    }

    else if (sci.includes(val[i]))
    {
        newTrig();
        inp.value = 0;
        sizeCheck();
        checkReset();
        return;
    }

    else if (val[i] == '.')
    {
        for (let j = 0; j < i; j++)
        {
            if (val[j] == '.')
            {
                inp.value = val.slice(0, i);
                return;
            }
        }
        return;
    }

    else if (val[i] == '=')
    {
        if (disp.value.length == 0)
        {
            inp.value = inp.value.slice(0, i);
            return;
        }
        try
        {
            const value = calculateResult();
            inp.value = value;
            sizeCheck();
            disp.value = '';
            return;
        }
        catch
        {
            alert('Invalid Operations, check precedence')
            inp.value = 0;
            disp.value = '';
            return;
        }
    }

    else
    {
        inp.value = val.slice(0, i);
    }
}

function calculateResult()
{
    let dval = document.getElementById('exp_box').value;
    const val = document.getElementById('input_box').value;
    if (dval[dval.length - 1] != ')')
    {
        if (val == '=')
            dval += '0=';
        else
            dval = dval + val;
    }
    else
        dval += '='
    dval = format(dval);
    console.log(dval);
    checkReset();
    sizeCheck();
    return eval(dval.slice(0, dval.length - 1));
}

function format(val)
{
    let newVal = '';
    for (let i = 0; i < val.length; i++)
    {
        if (val[i] == 's')
        {
            newVal += 'Math.'+val.slice(i, i+3);
            i+=2;
        }
        else if (val[i] == 'c')
        {
            newVal += 'Math.'+val.slice(i, i+3);
            i+=2;
        }
        else if (val[i] == 't')
        {
            newVal += 'Math.'+val.slice(i, i+3);
            i+=2;
        }
        else if (val[i] == 'l')
        {
            newVal += 'Math.'+val.slice(i, i+3);
            i+=2;
        }
        else if (val[i] == '^')
        {
            newVal += '**';
        }
        else if (val[i] == ')')
        {
            let count = 0;
            for (let j=i-1; j>=0; j--)
            {
                if (val[j] == '(' && count == 0)
                {
                    if (val[j-1] == 'g')
                        newVal += ')';
                    else
                        newVal += '*Math.PI/180)';
                }
                if (val[j] == ')')
                    count ++;
            }
        }
        else
        {
            newVal += val[i];
        }
    }
    return newVal;
}

function newOperator()
{
    const disp = document.getElementById('exp_box');
    const inp = document.getElementById('input_box');
    disp.value += inp.value;
}

function getFunc()
{
    const dVal = document.getElementById('exp_box').value;
    let func = '';
    const opers = ['+', '-', '*', '/', '%', '^'];
    for (let i = dVal.length - 1; i >= 0; i--)
    {
        if (opers.includes(dVal[i]))
        {
            func = dVal.slice(i+1);
            return func;
        }
    }
    return dVal;
}

function newTrig()
{
    const disp = document.getElementById('exp_box');
    const inp = document.getElementById('input_box');
    const val = inp.value;
    let func;
    const last = val[val.length - 1];
    if (last == 's' || last == 'S')
        func = 'sin(';
    else if (last == 'c' || last == 'C')
        func = 'cos(';
    else if (last == 't' || last == 'T')
        func = 'tan(';
    else
        func = 'log(';
    if (disp.value.length == 0)
    {
        disp.value += func + inp.value.slice(0, val.length-1) + ')';
    }

    else
    {
        const opers = ['+', '-', '*', '/', '%', '^'];
        let dVal = disp.value;
        if (dVal[dVal.length - 1] == ')')
        {
            const f = getFunc();
            const ind = dVal.lastIndexOf(f);
            dVal = dVal.slice(0, ind);
            dVal += func + f + ')';
            disp.value = dVal;
        }
        else
        {
            disp.value += func + inp.value.slice(0, -1) + ')';
        }
    }
}

function pi()
{
    const inp = document.getElementById('input_box');
    const val = inp.value;
    if (val != '0')
        return;
    inp.value += Math.PI;
    numonly();
}

function operator(id)
{
    const inp = document.getElementById('input_box');
    inp.value += id;
    numonly();
}

function reset()
{
    const inp = document.getElementById('input_box');
    const disp = document.getElementById('exp_box');
    if (inp.value.localeCompare('0'))
    {
        inp.value = '0';
        checkReset();
        return;
    }
    inp.value = 0;
    disp.value = '';
    checkReset();
}
function back()
{
    const inp = document.getElementById('input_box');
    if (inp.value.localeCompare('0'))
        inp.value = inp.value.slice(0, inp.value.length - 1);
    else
    {
        const disp = document.getElementById('exp_box');
        const dval = disp.value;
        if (dval.length == 0)
            return
        const n = remDVal();
        disp.value = dval.slice(0, n);
    }
    numonly();
}

function remDVal()
{
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const disp = document.getElementById('exp_box');
    const dval = disp.value;
    for (let i = dval.length-2; i>=0; i--)
    {
        if (!digits.includes(dval[i]))
            return i+1;
    }
    return 0;
}
function checkReset()
{
    const inp = document.getElementById('input_box');
    const res = document.getElementById('reset');
    if (inp.value.localeCompare('0'))
        res.innerHTML = 'CE'
    else
        res.innerHTML = 'C'
}

function digit(id)
{
    const ele = document.getElementById(id);
    const inp = document.getElementById('input_box');
    inp.value += ele.innerHTML;
    numonly();    
}

function func(id)
{
    const inp = document.getElementById('input_box');
    inp.value += id[0];
    numonly();
}