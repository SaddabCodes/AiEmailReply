import { useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import "./EmailWriter.css";

export default function EmailWriter() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="email-writer-container">
      <Typography variant="h3" component="h1" className="email-writer-title">
        Email Reply Generator
      </Typography>

      <Box className="email-writer-box">
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          className="email-writer-textfield"
        />

        <FormControl fullWidth className="email-writer-formcontrol">
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ""}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}
            className="email-writer-select"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          className="email-writer-button"
        >
          {loading ? <CircularProgress size={24} className="email-writer-loader" /> : "Generate Reply"}
        </Button>
      </Box>

      {error && (
        <Typography color="error" className="email-writer-error">
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box className="email-writer-reply-box">
          <Typography variant="h6" className="email-writer-reply-title">
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ""}
            inputProps={{ readOnly: true }}
            className="email-writer-reply-textfield"
          />
          <Button
            variant="outlined"
            className="email-writer-copy-button"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}
