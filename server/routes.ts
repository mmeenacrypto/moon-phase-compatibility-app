import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compatibilityRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Calculate compatibility endpoint
  app.post("/api/compatibility", async (req, res) => {
    try {
      const validatedData = compatibilityRequestSchema.parse(req.body);
      
      // Import moon calculation and compatibility logic
      const { calculateMoonPhase } = await import("../client/src/lib/moonCalculator");
      const { calculateCompatibility } = await import("../client/src/lib/compatibilityEngine");
      const { celebrities } = await import("../client/src/data/celebrities");
      
      // Process person 1
      let person1Date: string;
      let person1Name: string;
      let person1Image: string | null = null;
      
      if (validatedData.person1Type === 'date') {
        person1Date = validatedData.person1Value;
        person1Name = person1Date;
      } else {
        const celeb = celebrities.find(c => c.slug === validatedData.person1Value);
        if (!celeb) {
          return res.status(400).json({ message: "Celebrity not found" });
        }
        person1Date = celeb.birthDate;
        person1Name = celeb.name;
        person1Image = celeb.image;
      }
      
      // Process person 2
      let person2Date: string;
      let person2Name: string;
      let person2Image: string | null = null;
      
      if (validatedData.person2Type === 'date') {
        person2Date = validatedData.person2Value;
        person2Name = person2Date;
      } else {
        const celeb = celebrities.find(c => c.slug === validatedData.person2Value);
        if (!celeb) {
          return res.status(400).json({ message: "Celebrity not found" });
        }
        person2Date = celeb.birthDate;
        person2Name = celeb.name;
        person2Image = celeb.image;
      }
      
      // Calculate moon phases
      const person1MoonData = calculateMoonPhase(person1Date);
      const person2MoonData = calculateMoonPhase(person2Date);
      
      // Calculate compatibility
      const compatibility = calculateCompatibility(person1MoonData, person2MoonData);
      
      // Generate share URL
      const shareUrl = `${validatedData.person1Value}+${validatedData.person2Value}`;
      
      // Save result
      const result = await storage.saveCompatibilityResult({
        person1Type: validatedData.person1Type,
        person1Value: validatedData.person1Value,
        person2Type: validatedData.person2Type,
        person2Value: validatedData.person2Value,
        compatibilityScore: compatibility.score,
        person1MoonPhase: person1MoonData.phase,
        person1ZodiacSign: person1MoonData.zodiacSign,
        person2MoonPhase: person2MoonData.phase,
        person2ZodiacSign: person2MoonData.zodiacSign,
        shareUrl,
      });
      
      res.json({
        ...result,
        person1: {
          name: person1Name,
          date: person1Date,
          image: person1Image,
          moonPhase: person1MoonData.phase,
          zodiacSign: person1MoonData.zodiacSign,
          moonImage: person1MoonData.image,
          description: person1MoonData.description,
        },
        person2: {
          name: person2Name,
          date: person2Date,
          image: person2Image,
          moonPhase: person2MoonData.phase,
          zodiacSign: person2MoonData.zodiacSign,
          moonImage: person2MoonData.image,
          description: person2MoonData.description,
        },
        compatibility: compatibility,
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Compatibility calculation error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get compatibility result by share URL
  app.get("/api/compatibility/:shareUrl", async (req, res) => {
    try {
      const result = await storage.getCompatibilityResult(req.params.shareUrl);
      if (!result) {
        return res.status(404).json({ message: "Compatibility result not found" });
      }
      
      // Import moon calculation and compatibility logic
      const { calculateMoonPhase } = await import("../client/src/lib/moonCalculator");
      const { calculateCompatibility } = await import("../client/src/lib/compatibilityEngine");
      const { celebrities } = await import("../client/src/data/celebrities");
      
      // Process person 1
      let person1Date: string;
      let person1Name: string;
      let person1Image: string | null = null;
      
      if (result.person1Type === 'date') {
        person1Date = result.person1Value;
        person1Name = person1Date;
      } else {
        const celeb = celebrities.find(c => c.slug === result.person1Value);
        if (!celeb) {
          return res.status(400).json({ message: "Celebrity not found" });
        }
        person1Date = celeb.birthDate;
        person1Name = celeb.name;
        person1Image = celeb.image;
      }
      
      // Process person 2
      let person2Date: string;
      let person2Name: string;
      let person2Image: string | null = null;
      
      if (result.person2Type === 'date') {
        person2Date = result.person2Value;
        person2Name = person2Date;
      } else {
        const celeb = celebrities.find(c => c.slug === result.person2Value);
        if (!celeb) {
          return res.status(400).json({ message: "Celebrity not found" });
        }
        person2Date = celeb.birthDate;
        person2Name = celeb.name;
        person2Image = celeb.image;
      }
      
      // Calculate moon phases
      const person1MoonData = calculateMoonPhase(person1Date);
      const person2MoonData = calculateMoonPhase(person2Date);
      
      // Calculate compatibility
      const compatibility = calculateCompatibility(person1MoonData, person2MoonData);
      
      res.json({
        ...result,
        person1: {
          name: person1Name,
          date: person1Date,
          image: person1Image,
          moonPhase: person1MoonData.phase,
          zodiacSign: person1MoonData.zodiacSign,
          moonImage: person1MoonData.image,
          description: person1MoonData.description,
        },
        person2: {
          name: person2Name,
          date: person2Date,
          image: person2Image,
          moonPhase: person2MoonData.phase,
          zodiacSign: person2MoonData.zodiacSign,
          moonImage: person2MoonData.image,
          description: person2MoonData.description,
        },
        compatibility: compatibility,
      });
    } catch (error) {
      console.error("Error fetching compatibility result:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Search celebrities endpoint
  app.get("/api/celebrities/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      
      const { celebrities } = await import("../client/src/data/celebrities");
      const filtered = celebrities.filter(celeb => 
        celeb.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results
      
      res.json(filtered);
    } catch (error) {
      console.error("Celebrity search error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
