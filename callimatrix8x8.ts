let strip = neopixel.create(DigitalPin.P0, 64, NeoPixelMode.RGB)

const enum cbrightness {
    //% block="100"
    hp1 = 1,
    //% block="80"
    hp2 = 2,
    //% block="60"
    hp6 = 6,
    //% block="40"
    hp25 = 25,
    //% block="20"
    hp85 = 85
}

//% weight=6 color=#4e77dd icon="\uf039"
namespace callimatrix {

    /**
     */
    //% block="Bild8x8"
    //% imageLiteral=1
    //% imageLiteralColumns=8
    //% imageLiteralRows=8
    //% shim=images::createImage
    //% weight=90
    export function matrix8x8(i: string): Image {
        const im = <Image><any>i;
        return im
    }

    //% help=images/icon-image
    //% blockId=cimage block="Bildsymbol %i"
    //% i.fieldEditor="imagedropdown"
    //% i.fieldOptions.columns="5"
    //% i.fieldOptions.width="380"
    //% i.fieldOptions.maxRows=4
     //% weight=90
    export function iImage(i: IconNames): Image {
     return images.iconImage(i)
    }

    //% block="zeige Farbe %color an x | %x |y | %y || Helligkeit %brightnes |\\%"
    //% color.shadow="colorNumberPicker"  color.defl=0xff0000
    //% pixel.min=0 pixel.max=11 brightnes.defl=cbrightness.hp1
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=60
    export function SetMatrixColorbright(color: number, x:number, y:number, brightnes:cbrightness=cbrightness.hp1) {
        let r,g,b:number
        r = (color & 0xff0000) >> 16
        g = (color & 0xff00) >> 8
        b = (color & 0xff) // rgb Einzelfarbwerte extrahieren
        r = Math.idiv(r, brightnes)
        g = Math.idiv(g, brightnes)
        b = Math.idiv(b, brightnes) // Helligkeit vermindern
        color = (r << 16) + (g << 8) + b // Farbe zusammenbauen
        strip.setMatrixColor(x, y, color)
    }

    //% block="schreibe Matrix %im=variables_get(matrix_1) %color|| Helligkeit %brightnes |\\%"
    //% color.shadow="colorNumberPicker"  color.defl=0xff0000
    //% weight=70
    export function writeImageRGB (im: Image, color: number, brightnes:cbrightness=cbrightness.hp1) {
    for (let y = 0; y <= im.height() - 1; y++) {
        for (let x = 0; x <= im.width() - 1; x++) {
            if ((im.pixel(x, y) ? 1 : 0)) {
                SetMatrixColorbright(color, x, y, brightnes)
            }
        }
    }
  }

    //% blockId="callimatrix_show" block="Änderungen anzeigen" blockGap=8
    //% weight=80
    //% parts="neopixel"
    export function callimatrix_show() {
        strip.show()
        }

    /**
    * Löscht alle Neopixel. "Änderungen anzeigen" aufrufen!
    */
    //% blockId="callimatrix_del" block="lösche Matrix" blockGap=8
    //% weight=80
    //% parts="neopixel"
   export function callimatrix_del() {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }

    /**
    * Konvertiert Rot-, Grün- und Blauanteil in eine RGB Farbe
    */
    //% blockId="Callineopixel_rgb" block="RGB: Rot %red|Grün %green|Blau %blue"
    //% group=Farben
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    //% block="initialisiere 8x8 Matrix an Pin %pin"
    //% pin.defl=DigitalPin.C16
    //% weight=100
    export function initNeoMatrix (pin: DigitalPin) {
     strip.setPin(pin)
     strip.setMatrixWidth(8)
    }

   /**
     * Converts a hue saturation luminosity value into a RGB color
     * @param h Farbton from 0 to 360
     * @param s Sättigung from 0 to 99
     * @param l Helligkeit from 0 to 99
     */
    //% blockId=calliHSL block="HSL: Farbton %h|Sättigung %s|Helligkeit %l"
    //% s.defl=99 l.defl=50
    //% group=Farben
    export function callihsl(h: number, s: number, l: number): number {
        return neopixel.hsl(h,s,l);
    } 

    /**
    * Konvertiert den Farbnamen in eine Zahl
    */
    //% blockId=CalliColor block="%c"
    //% group=Farben
    export function CalliColor(c: NeoPixelColors): number {
        return c;
    }

   

}