import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FileUtil {

    constructor() { }

    downloadcsv(data: any, exportFileName: string) {

        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportFileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', exportFileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    downloadpdf(data: any, exportFileName: string) {

        const blob = new Blob([data], { type: 'application/pdf' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportFileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);

                link.setAttribute('href', url);
                link.setAttribute('download', exportFileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    downloadImage(data: any, exportFileName: string) {
        const blob = new Blob([data], { type: 'image/jpeg' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportFileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);

                link.setAttribute('href', url);
                link.setAttribute('download', exportFileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    downloadExcel(data: any, exportFileName: string) {
        const blob = new Blob([data], { type: 'application/xlsx;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportFileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', exportFileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    base64ToArrayBuffer(data) {
        var binaryString = window.atob(data);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    //Download excel file
    // downloadxlsx(data: any, exportFileName: string) {

    //             const blob = new Blob([data], { type: 'application/xlsx' });
    //             console.log(blob)
    //             if (navigator.msSaveBlob) { // IE 10+
    //                 navigator.msSaveBlob(blob, exportFileName);
    //             } else {
    //                 const link = document.createElement('a');
    //                 if (link.download !== undefined) { // feature detection
    //                     // Browsers that support HTML5 download attribute
    //                     const url = URL.createObjectURL(blob);
    //                     link.setAttribute('href', url);
    //                     link.setAttribute('download', exportFileName);
    //                     document.body.appendChild(link);
    //                     link.click();
    //                     document.body.removeChild(link);
    //                 }
    //             }
    //         }



    isCSVFile(file) {
        return file.name.endsWith('.csv');
    }

    isExcelFile(file) {
        return file.name.endsWith('.xlsx');
    }

    getHeaderArray(csvRecordsArr, tokenDelimeter) {
        const headers = csvRecordsArr[0].split(tokenDelimeter);
        const headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    validateHeaders(origHeaders, fileHeaaders) {
        if (origHeaders.length !== fileHeaaders.length) {
            return false;
        }

        let fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] !== fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,
        validateHeaderAndRecordLengthFlag, tokenDelimeter) {
        const dataArr = [];

        for (let i = 0; i < csvRecordsArray.length; i++) {
            const data = csvRecordsArray[i].split(tokenDelimeter);

            if (validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
                if (data === '') {
                    alert('Extra blank line is present at line number ' + i + ', please remove it.');
                    return null;
                } else if (data.length === 1) {
                    continue;
                } else {
                    alert('Record at line number ' + i + ' contain ' + data.length
                        + ' tokens, and is not matching with header length of :'
                        + headerLength);
                    return null;
                }
            }

            const col = [];
            for (let j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    }

    // copyToClipboard(val:string) {
    //     let textarea = document.createElement('textarea');
    //     textarea.style.position = 'fixed';
    //     textarea.style.left = '0';
    //     textarea.style.top = '0';
    //     textarea.style.opacity = '0';
    //     textarea.value = val;
    //     document.body.appendChild(textarea);
    //     textarea.focus();
    //     textarea.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(textarea);
    // }

    copyDivToClipboard(divs) {
        let textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.left = '0';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        textarea.value = divs.innerText;
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}
