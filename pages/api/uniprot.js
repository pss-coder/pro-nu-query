const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async function handler(req, res) {
    // const {uniprotid} = req.query

    try {
        const response = await fetch(`https://rest.uniprot.org/uniprotkb/P12345.xml`);
        const xmlText = await response.text();
        // console.log(xmlText)
        
        // Parse the XML response to extract the protein sequence
        // const parser = new DOMParser();
        const dom = new JSDOM(xmlText);
        // const xmlDoc = parser.parseFromString('<sequence length="430" mass="47409" checksum="12F54284974D27A5" modified="2013-09-18" version="2" precursor="true">MALLHSARVLSGVASAFHPGLAAAASARASSWWAHVEMGPPDPILGVTEAYKRDTNSKKMNLGVGAYRDDNGKPYVLPSVRKAEAQIAAKGLDKEYLPIGGLAEFCRASAELALGENSEVVKSGRFVTVQTISGTGALRIGASFLQRFFKFSRDVFLPKPSWGNHTPIFRDAGMQLQSYRYYDPKTCGFDFTGALEDISKIPEQSVLLLHACAHNPTGVDPRPEQWKEIATVVKKRNLFAFFDMAYQGFASGDGDKDAWAVRHFIEQGINVCLCQSYAKNMGLYGERVGAFTVICKDADEAKRVESQLKILIRPMYSNPPIHGARIASTILTSPDLRKQWLQEVKGMADRIIGMRTQLVSNLKKEGSTHSWQHITDQIGMFCFTGLKPEQVERLTKEFSIYMTKDGRISVAGVTSGNVGYLAHAIHQVTK</sequence>', "text/xml");
        // console.log(xmlDoc.querySelector('sequence'))
        const sequenceNode = dom.window.document.querySelector('sequence');
        console.log(sequenceNode.getAttribute('length'))
        console.log(sequenceNode.getAttribute('mass'))
        
        if (sequenceNode) {
          const proteinSequence = sequenceNode.textContent;
        //   return proteinSequence;
          return res.status(200).json({data: proteinSequence})
        } else {
        //   throw new Error('Protein sequence not found in the XML response');
        return res.status(400).json({ error: { message:  'No result found' } })
        }
      } catch (error) {
        console.log(error)
        // throw new Error('Error fetching protein sequence');
        return res.status(400).json({ error: { message:  'No result found' } })
      }
}