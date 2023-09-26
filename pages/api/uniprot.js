const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DOMParser = new JSDOM().window.DOMParser;

export default async function handler(req, res) {
  // console.log('query', req.query)
    const {uniprotid} = req.query
    // console.log("uniprot id received: ", uniprotid)

    try {
        const response = await fetch(`https://rest.uniprot.org/uniprotkb/${uniprotid}.xml`);
        const xmlText = await response.text();
        // console.log(xmlText)

          

        if (xmlText) {
          // const proteinSequence = sequenceNode.textContent;

        //   return proteinSequence;
          // console.log(proteinSequence)
          return res.status(200).json({data: xmlText})
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